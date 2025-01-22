import { v2 } from "cloudinary";

v2.config({
  cloud_name: "dmd35imtv",
  api_key:process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const UploadHtmlFileOnClodinary = async (filepath) => {
  try {
    const result = await v2.uploader.upload(filepath);
    // console.log(result)
 
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
};
