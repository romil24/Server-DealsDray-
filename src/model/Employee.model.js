import mongoose, { Schema } from "mongoose";

const EmployeeSchema = new Schema(
  {
    // img store into cloudinary here we store url of img
    f_img: {
      type: String,
      require: true,
    },
    f_Name: {
      type: String,
      require: true,
      unique: true,
      lowerCase: true,
      trim: true,
      index: true,
    },
    f_Email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    f_Mobile: {
      type: String,
      require: true,
    },
    f_Designation: {
      type: String,
      enum: ["HR", "Manager", "sales"],
      default: null,
      require: true,
    },
    f_gender: {
      type: String,
      enum: ["M", "F"],
      default: null,
      require: true,
    },
    f_Course: {
      type: String,
      enum: ["MCA", "BCA", "BSC"],
      default: null,
      require: true,
    },
  },
  { timestamps: true },
);

export const Emp = mongoose.model("Employee", EmployeeSchema);
