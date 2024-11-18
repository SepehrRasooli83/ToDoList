import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable in your .env file");
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("Connected to the database successfully");
  } catch (err) {
    console.error(`Connecting to the database failed: ${err}`);
    throw err;
  }
}

