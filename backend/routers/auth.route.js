import express from "express";

import { token, protect } from "../middlewares/auth.middleware.js";
import { login, register, logout, sponsor, profile, access } from "../controllers/auth.control.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/sponsor", sponsor);
router.post("/logout", logout);
router.get("/profile", token, profile);
router.get("/protect", protect, access);

export default router;
