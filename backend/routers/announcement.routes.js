import express from "express";
import * as announcement from "../controllers/announcement.control.js";
import { token } from "../middlewares/token.middleware.js";

const router = express.Router();

// Allow all authenticated users to get announcements
router.get("/", token, announcement.getAll);

// Only allow panels and officers to create announcements
router.post("/", token, announcement.create);

// Only allow panels and officers to get available events
router.get("/events", token, announcement.getAvailableEvents);

export default router;