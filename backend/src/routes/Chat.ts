import { Router } from "express";
import { ChatWithAi } from "../config/model";
import prisma from "../config/prisma";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        reports: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const reply = await ChatWithAi(message, user);

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate response",
    });
  }
});

export default router;