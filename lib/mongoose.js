import mongoose from "mongoose";

let isConnected = false; //variable to check if mongoose is connected

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("MONGODB_URI is not found!");

  if (isConnected) return console.log("Already connected to mongodb...");

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log(error);
  }
};