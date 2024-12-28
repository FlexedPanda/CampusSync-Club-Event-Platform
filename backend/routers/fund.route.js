import express from "express";

import { token } from "../middlewares/token.middleware.js";
import { provide, funded, drop, sponsor, offered, cancel, offers, accept, reject, sponsored } from "../controllers/fund.control.js";

const router = express.Router();

router.post("/provide/:id", token, provide);
router.get("/funded", funded);
router.delete("/funded/:id", drop);
router.post("/sponsor/:id", token, sponsor);
router.get("/offered", token, offered);
router.delete("/offered/:id", token, cancel);
router.get("/offers", offers);
router.post("/offers/:id", token, accept);
router.delete("/offers/:id", token, reject);
router.get("/sponsored", token, sponsored);

export default router;