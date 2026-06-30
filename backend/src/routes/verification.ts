import { Router } from "express";
import prisma from "../config/prisma";
import { requireAuth, getAuth } from "@clerk/express";

const router = Router();

router.get("/feed", requireAuth(), async (req, res) => {
    try {

        const { userId } = getAuth(req);

        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });

        const reports = await prisma.report.findMany({

            where: {

                // don't show my own reports
                NOT: {
                    userId,
                },

                // don't show reports I already verified
                verifications: {
                    none: {
                        userId,
                    },
                },
            },

            include: {

                user: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                    },
                },

            },

            orderBy: {
                createdAt: "desc",
            },

        });

        res.json(reports);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error",
        });
    }
});

router.post("/:reportId", requireAuth(), async (req, res) => {

    try {

        const reportId = String(req.params.reportId);
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!userId)
            return res.sendStatus(401);

        const alreadyVerified = await prisma.verification.findUnique({

            where: {
                reportId_userId: {
                    reportId,
                    userId,
                },
            },

        });

        if (alreadyVerified) {

            return res.status(400).json({
                message: "Already verified",
            });

        }

        await prisma.$transaction([

            prisma.verification.create({

                data: {
                    reportId,
                    userId,
                },

            }),

            prisma.report.update({

                where: {
                    id: reportId,
                },

                data: {
                    verificationCount: {
                        increment: 1,
                    },
                },

            }),

            prisma.user.update({

                where: {
                    id: userId,
                },

                data: {
                    xp: {
                        increment: 5,
                    },
                },

            }),

        ]);

        res.json({
            success: true,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error",
        });

    }

});

export default router;