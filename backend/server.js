import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import authRouter from "./routers/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/", (req, res) => {
	res.send("Backend API Running...");
});

app.listen(PORT, () => {
	connectDB();
	console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mServer:\x1b[0m \x1b[36m http://localhost:\x1b[1m${PORT}/\x1b[0m\x1b[0m`);
});
