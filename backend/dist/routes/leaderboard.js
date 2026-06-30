"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const router = (0, express_1.Router)();
/**
 * GET /api/leaderboard
 * Returns top users ordered by XP
 */
router.get("/", async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.default = router;
