import { Router } from "express";
import { ChatWithAi } from "../config/model";
import prisma from "../config/prisma";
import { clerkClient } from "@clerk/express";

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
      console.error("User ID is required in request body");
      return res.status(401).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Try to find the user
    let user = await prisma.user.findUnique({
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

    // Create user if not found
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      await prisma.user.create({
        data: {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0].emailAddress,
          name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
          imageUrl: clerkUser.imageUrl,
        },
      });

      // Fetch the newly created user
      user = await prisma.user.findUnique({
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
    }

    if (!user) {
      console.error("Failed to create or fetch user after creation");
      return res.status(500).json({
        success: false,
        message: "Failed to create user",
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