import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATA_BASE_URI as string);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.log(error);
  }
}
