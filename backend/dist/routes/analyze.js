"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const cloud_1 = require("../controller/cloud");
const model_1 = require("../config/model");
const prisma_1 = __importDefault(require("../config/prisma"));
const express_2 = require("@clerk/express");
const express_3 = require("@clerk/express");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
router.post("/", upload.single("image"), (0, express_2.requireAuth)(), async (req, res) => {
    try {
        const file = req.file;
        const { address, latitude, longitude } = req.body;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }
        const { userId } = (0, express_2.getAuth)(req);
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
        const existingUser = await prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!existingUser) {
            const clerkUser = await express_3.clerkClient.users.getUser(userId);
            await prisma_1.default.user.create({
                data: {
                    id: clerkUser.id,
                    email: clerkUser.emailAddresses[0].emailAddress,
                    name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
                    imageUrl: clerkUser.imageUrl,
                },
            });
        }
        // Upload image to Cloudinary
        const imageUrl = await (0, cloud_1.uploadToCloudinary)(file.buffer);
        // Analyze image using Gemini
        const aiResult = await (0, model_1.analyzeImage)(file.buffer);
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
    }
    catch (error) {
        console.error("Upload Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.default = router;
