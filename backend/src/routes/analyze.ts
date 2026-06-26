import { Router } from "express";
import multer from "multer";
import { uploadToCloudinary } from "../controller/cloud";
import { analyzeImage } from "../config/model";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;

      const {
        address,
        latitude,
        longitude,
      } = req.body;

      if (!file) {
        return res.status(400).json({
          message: "Image is required",
        });
      }
      const imageUrl = await uploadToCloudinary(file.buffer);

      console.log("Cloudinary URL:", imageUrl);
      const aiResult = await analyzeImage(file.buffer);

      console.log(aiResult);
      console.log("Image:", file.originalname);
      console.log("Address:", address);
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      // TODO:
      // Upload image to Cloudinary
      // Send image to AI service
      // Save report in database

      return res.status(200).json({
        success: true,
        category: "Pothole",
        confidence: 0.95,
        imageName: file.originalname,
        address,
        latitude,
        longitude,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

export default router;