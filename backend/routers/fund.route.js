import express from "express";

import { token } from "../middlewares/token.middleware.js";
import { provide, funded } from "../controllers/fund.control.js";

const router = express.Router();

router.post("/provide/:id", token, provide);
router.get("/funded", token, funded);

export default router;