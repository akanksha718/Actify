
import { Router } from "express";
import { requireAuth, getAuth } from "@clerk/express";
import prisma from "../config/prisma";

const router = Router();


router.post(
    "/",
    requireAuth(),
    async (req, res) => {
        try {
            const {
                imageUrl,
                category,
                confidence,
                severity,
                description,
                department,
                address,
            } = req.body;

            const latitude = Number(req.body.latitude);
            const longitude = Number(req.body.longitude);

            if (isNaN(latitude) || isNaN(longitude)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid latitude or longitude",
                });
            }

            const { userId } = getAuth(req);

            const report = await prisma.report.create({
                data: {
                    imageUrl,
                    category,
                    confidence:Number (confidence),
                    severity,
                    description,
                    department,
                    address,
                    latitude,
                    longitude,
                    userId: userId!,
                },
            });

            await prisma.user.update({
                where: {
                    id: userId!,
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
        } catch (err) {
            console.log(err);

            res.status(500).json({
                success: false,
            });
        }
    }
);

export default router