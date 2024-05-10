import { v2 as cloudNary } from "cloudinary";
import fs from "fs";

cloudNary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});
const uploadCloudNary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudNary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    console.log("catch Block Run", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadCloudNary };
