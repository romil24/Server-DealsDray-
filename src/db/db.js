import { DB_Name } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_Name}`,
    );
    console.log(`\nMongoDb Connected SuccessFully`);
  } catch (error) {
    console.log("MongoDb Connection Fail", error);
    process.exit(1);
  }
};

export default connectDB ;
