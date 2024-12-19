import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import authRouter from "./routers/auth.route.js";
import clubRouter from "./routers/club.route.js";
import eventRouter from "./routers/event.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/club", clubRouter);
app.use("/api/event", eventRouter);

app.use("/", (req, res) => res.send("Backend API Running..."));

app.listen(PORT, () => connectDB());
