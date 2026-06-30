import { Router } from "express";
import prisma from "../config/prisma";
import { requireAuth, getAuth } from "@clerk/express";

const router = Router();

/**
 * GET /api/stats
 * Returns logged in user's dashboard statistics
 */
router.get("/", requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const [totalReports, resolvedReports] = await Promise.all([
      prisma.report.count({
        where: {
          userId,
        },
      }),

      prisma.report.count({
        where: {
          userId,
          status: "FIXED",
        },
      }),
    ]);

    return res.json({
      success: true,
      totalReports,
      resolvedReports,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;