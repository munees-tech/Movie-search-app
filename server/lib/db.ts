import { error } from "console";
import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("mongo url is defined .env file");
    }
    await mongoose.connect(mongoUrl)
    console.log("Mongodb Connected Succesfully");
  } catch (error: any) {
    console.log(`Error in connect db ${error}`);
  }
};

export default connectDb;
