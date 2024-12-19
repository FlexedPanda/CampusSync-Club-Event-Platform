import express from "express";

import { list } from "../controllers/event.control.js";

const router = express.Router();

router.get("/list", list);

export default router;