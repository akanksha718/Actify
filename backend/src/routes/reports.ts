import { Router } from "express";
import prisma from "../config/prisma";
import { requireAuth, getAuth } from "@clerk/express";

const router = Router();

router.get("/me", requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
      });
    }

    const reports = await prisma.report.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      success: true,
      reports,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
    });
  }
});

export default router;