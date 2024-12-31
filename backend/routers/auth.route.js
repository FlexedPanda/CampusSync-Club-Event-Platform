import express from "express";
import { token } from "../middlewares/token.middleware.js";
import { 
  login, 
  clubs, 
  register, 
  logout, 
  profile, 
  access,
  getPendingRegistrations, 
  approveRegistration, 
  rejectRegistration 
} from "../controllers/auth.control.js";

const router = express.Router();

router.get("/clubs", clubs);
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/profile", token, profile);
router.get("/protect", token, access);

// Update registration routes to be accessible by panel members
router.get("/pending-registrations", token, getPendingRegistrations);
router.post("/approve-registration/:id", token, approveRegistration);
router.delete("/reject-registration/:id", token, rejectRegistration);

export default router;
