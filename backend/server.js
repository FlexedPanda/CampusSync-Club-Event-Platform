import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

app.use("/", (req, res) => {
	res.send("Backend API is running successfully");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
	connectDB();
});
