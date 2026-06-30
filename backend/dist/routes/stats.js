"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
/**
 * GET /api/stats
 * Returns logged in user's dashboard statistics
 */
router.get("/", (0, express_2.requireAuth)(), async (req, res) => {
    try {
        const { userId } = (0, express_2.getAuth)(req);
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const [totalReports, resolvedReports] = await Promise.all([
            prisma_1.default.report.count({
                where: {
                    userId,
                },
            }),
            prisma_1.default.report.count({
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
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
exports.default = router;
