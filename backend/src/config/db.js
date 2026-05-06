import mongoose from "mongoose";

const URI = process.env.MONGO_URI_FULL_SET_UP;

export const connectDB = async () => {
  await mongoose
    .connect(
     URI
    )
    .then(() => console.log("Connected to MongoDB"));
};

