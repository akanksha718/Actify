"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
router.get("/:id/xp", (0, express_2.requireAuth)(), async (req, res) => {
    try {
        const { userId } = (0, express_2.getAuth)(req);
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
        const user = await prisma_1.default.user.findUnique({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.default = router;
