import express from "express";

import { token } from "../middlewares/token.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { check, request, requested, cancel, proposals, approve, decline, approvals, postpone, launch, campus, join, joined, leave, club } from "../controllers/event.control.js";

const router = express.Router();

router.get("/check", token, check);
router.post("/request", token, request);
router.get("/requests", token, requested);
router.delete("/requests/:id", cancel);
router.get("/proposals", proposals);
router.post("/proposals/:id", token, approve);
router.delete("/proposals/:id", decline);
router.get("/approvals", token, approvals);
router.post("/approvals/:id", upload, launch);
router.delete("/approvals/:id", postpone);
router.get("/campus", token, campus);
router.post("/campus/:id", token, join);
router.get("/joins", token, joined);
router.delete("/joins/:id", token, leave);
router.get("/club", token, club);

export default router;
