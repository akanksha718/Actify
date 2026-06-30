"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const model_1 = require("../config/model");
const prisma_1 = __importDefault(require("../config/prisma"));
const router = (0, express_1.Router)();
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
            return res.status(401).json({
                success: false,
                message: "User ID is required",
            });
        }
        const user = await prisma_1.default.user.findUnique({
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
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const reply = await (0, model_1.ChatWithAi)(message, user);
        return res.status(200).json({
            success: true,
            reply,
        });
    }
    catch (error) {
        console.error("Chat Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate response",
        });
    }
});
exports.default = router;
