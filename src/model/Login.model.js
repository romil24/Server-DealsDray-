import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const LogSchema = new Schema(
  {
    f_userName: {
      type: String,
      require: true,
      unique: true,
      lowerCase: true,
      trim: true,
      index: true,
    },
    f_Pwd: {
      type: String,
      require: [true, "Password Is Required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

// Password Encrypt
LogSchema.pre("save", async function (next) {
  if (!this.isModified("f_Pwd")) return next();
  this.f_Pwd = await bcrypt.hash(this.f_Pwd, 10);
  next();
});

// Password Decrypt
LogSchema.methods.isCorrectPassword = async function (f_Pwd) {
  return await bcrypt.compare(f_Pwd, this.f_Pwd);
};
  
// Make Jwt Token
LogSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      f_userName: this.f_userName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};
export const Admin = mongoose.model("Admin", LogSchema);
