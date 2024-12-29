import express from "express";

import { token } from "../middlewares/token.middleware.js";
import { login, clubs, events, register, logout, sponsor, profile, access, registrations, approve, reject } from "../controllers/auth.control.js";

const router = express.Router();

router.get("/clubs", clubs);
router.get("/events", events);
router.post("/login", login);
router.post("/register", register);
router.post("/sponsor", sponsor);
router.post("/logout", logout);
router.get("/profile", token, profile);
router.get("/protect", token, access);
router.get("/registrations", token, registrations);
router.post("/registrations/:id", token, approve);
router.delete("/registrations/:id", token, reject);

export default router;
