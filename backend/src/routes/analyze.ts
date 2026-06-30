import { Router } from "express";
import multer from "multer";
import { uploadToCloudinary } from "../controller/cloud";
import { analyzeImage } from "../config/model";
import prisma from "../config/prisma";
import { requireAuth, getAuth } from "@clerk/express";
import { clerkClient } from "@clerk/express";


const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  upload.single("image"),
  requireAuth(),
  async (req, res) => {
    try {
      const file = req.file;

      const { address, latitude, longitude } = req.body;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      }
      const { userId } = getAuth(req);
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      const lat = Number(latitude);
      const lng = Number(longitude);

      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({
          success: false,
          message: "Invalid coordinates"
        });
      }
      const existingUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!existingUser) {
        const clerkUser = await clerkClient.users.getUser(userId);

        await prisma.user.create({
          data: {
            id: clerkUser.id,
            email: clerkUser.emailAddresses[0].emailAddress,
            name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
            imageUrl: clerkUser.imageUrl,
          },
        });
      }

      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(file.buffer);

      // Analyze image using Gemini
      const aiResult = await analyzeImage(file.buffer);
      const severity = ["LOW", "MEDIUM", "HIGH", "CRITICAL"].includes(aiResult.severity)
        ? aiResult.severity
        : "MEDIUM";
      // const report = await prisma.report.create({
      //   data: {

      //     imageUrl,

      //     category: aiResult.category,
      //     confidence: aiResult.confidence,
      //     severity: severity,
      //     description: aiResult.description,
      //     department: aiResult.recommendedDepartment,

      //     address,
      //     latitude: Number(latitude),
      //     longitude: Number(longitude),

      //     userId: userId,
      //   }
      // })

      // await prisma.user.update({
      //   where: {
      //     id: userId
      //   },
      //   data: {
      //     xp: {
      //       increment: 10
      //     }
      //   }
      // })

      // TODO:
      // Save report in database using Prisma

      return res.status(200).json({
        success: true,

        // Image information
        imageName: file.originalname,
        imageUrl,

        // Location
        address,
        latitude,
        longitude,

        // AI analysis
        category: aiResult.category,
        confidence: aiResult.confidence,
        severity: severity,
        description: aiResult.description,
        recommendedDepartment: aiResult.recommendedDepartment,
      });
    } catch (error) {
      console.error("Upload Error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

export default router;