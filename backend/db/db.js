import mongoose from "mongoose";

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("database is connected ");
    });
  } catch (error) {
    console.log(error);
    console.log(error.message)
  }
};
