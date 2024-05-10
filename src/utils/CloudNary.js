import { v2 as cloudNary } from "cloudinary";
import fs from "fs";

cloudNary.config({
  cloud_name: "ddnvxfmpl",
  api_key: 458547287864958,
  api_secret: "Hll90ncxpJEct8WG_W-rK9Zz88M",
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
