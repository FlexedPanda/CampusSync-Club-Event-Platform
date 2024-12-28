import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";

import connectDB from "./config/db.config.js";
import authRouter from "./routers/auth.route.js";
import eventRouter from "./routers/event.route.js";
import fundRouter from "./routers/fund.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/api/uploads", express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);
app.use("/api/fund", fundRouter);

app.use("/", (req, res) => res.send("Backend API Running..."));

app.listen(PORT, () => connectDB());
