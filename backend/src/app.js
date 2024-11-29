const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Backend Api is running successfully");
});

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = app;
