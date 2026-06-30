import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

/**
 * GET /api/leaderboard
 * Returns top users ordered by XP
 */
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        xp: "desc",
      },
      take: 20,
      select: {
        id: true,
        name: true,
        imageUrl: true,
        xp: true,
        level: true,
        reports: {
          select: {
            id: true,
          },
        },
      },
    });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      name: user.name ?? "Anonymous",
      imageUrl: user.imageUrl,
      xp: user.xp,
      level: user.level,
      reports: user.reports.length,
    }));

    res.json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;