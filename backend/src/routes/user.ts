import { Router } from "express";
import prisma from "../config/prisma";
import { requireAuth, getAuth } from "@clerk/express";

const router = Router();

router.get("/:id/xp", requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (req.params.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        xp: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("User XP:", user.xp);
    return res.json({
      success: true,
      xp: user.xp,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;