"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
router.get("/feed", (0, express_2.requireAuth)(), async (req, res) => {
    try {
        const { userId } = (0, express_2.getAuth)(req);
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const reports = await prisma_1.default.report.findMany({
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
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error",
        });
    }
});
router.post("/:reportId", (0, express_2.requireAuth)(), async (req, res) => {
    try {
        const reportId = String(req.params.reportId);
        const { userId } = (0, express_2.getAuth)(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!userId)
            return res.sendStatus(401);
        const alreadyVerified = await prisma_1.default.verification.findUnique({
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
        await prisma_1.default.$transaction([
            prisma_1.default.verification.create({
                data: {
                    reportId,
                    userId,
                },
            }),
            prisma_1.default.report.update({
                where: {
                    id: reportId,
                },
                data: {
                    verificationCount: {
                        increment: 1,
                    },
                },
            }),
            prisma_1.default.user.update({
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
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.default = router;
