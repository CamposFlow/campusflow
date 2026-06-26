import express from "express";
import { sendAlert } from "./alerta.js";

export const alerts = async (req, res) => {
    try {
        const { message, channelRef } = req.body;

        const result = await sendAlert({ message,channelRef });

        res.json({
            success: true,
            message: "Alert Successfully Sent",
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

const alertRoute = express.Router();

alertRoute.post("/telegram/send", alerts);

export default alertRoute;