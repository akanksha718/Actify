import { Router } from "express";
import { PrismaClient, ReportStatus } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/map/reports
router.get("/reports", async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      where: {
        status: {
          not: ReportStatus.FIXED,
        },
      },
      select: {
        id: true,
        latitude: true,
        longitude: true,
        address: true,
        category: true,
        severity: true,
        status: true,
      },
    });

    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch reports",
    });
  }
});

export default router;