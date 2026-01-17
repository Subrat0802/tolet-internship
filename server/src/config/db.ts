import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.DATABASE_URL_NEW;
console.log("DB", DB);

export const dbConnect = async (): Promise<void> => {
  try {
    if (!DB) {
      console.error("provide db url");
      process.exit(1);
    }

    await mongoose.connect(DB);

    console.log("database connected successfully");
  } catch (error) {
    console.error("error while connecting to database:", error);
    process.exit(1);
  }
};
