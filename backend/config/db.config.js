import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log(`  \x1b[32m➜\x1b[0m  \x1b[1mServer:\x1b[0m \x1b[36m http://localhost:\x1b[1m${PORT}/\x1b[0m\x1b[0m`);
		console.log(`  \x1b[32m➜\x1b[0m  \x1b[2m\x1b[1mMongoDB:\x1b[0m \x1b[2mconnected successfully\x1b[0m`);
	} catch (error) {
		console.log("Error connecting to MONGODB", error);
		process.exit(1);
	}
};

export default connectDB;
