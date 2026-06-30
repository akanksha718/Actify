"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
router.get("/me", (0, express_2.requireAuth)(), async (req, res) => {
    try {
        const { userId } = (0, express_2.getAuth)(req);
        if (!userId) {
            return res.status(401).json({
                success: false,
            });
        }
        const reports = await prisma_1.default.report.findMany({
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
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
        });
    }
});
exports.default = router;
