import { v2 } from "cloudinary";

v2.config({
  cloud_name: "dmd35imtv",
  api_key: "424113654613344",
  api_secret: "QNgrda51__CmmPxvCX-315R7cU0",
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
