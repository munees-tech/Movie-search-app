import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb Connected Succesfully");
    } catch (error) {
        console.log(`Error in connect db ${error}`);
    }
};

export default connectDb;