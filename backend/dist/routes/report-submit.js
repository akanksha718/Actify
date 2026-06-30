"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = require("@clerk/express");
const prisma_1 = __importDefault(require("../config/prisma"));
const router = (0, express_1.Router)();
router.post("/", (0, express_2.requireAuth)(), async (req, res) => {
    try {
        const { imageUrl, category, confidence, severity, description, department, address, } = req.body;
        const latitude = Number(req.body.latitude);
        const longitude = Number(req.body.longitude);
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({
                success: false,
                message: "Invalid latitude or longitude",
            });
        }
        const { userId } = (0, express_2.getAuth)(req);
        const report = await prisma_1.default.report.create({
            data: {
                imageUrl,
                category,
                confidence: Number(confidence),
                severity,
                description,
                department,
                address,
                latitude,
                longitude,
                userId: userId,
            },
        });
        await prisma_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                xp: {
                    increment: 10,
                },
            },
        });
        res.json({
            success: true,
            report,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
        });
    }
});
exports.default = router;
