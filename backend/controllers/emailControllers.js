import { GenratehtmlPreviewImage } from "../middleware/Puppter.js";
import emailTempModal from "../modals/emailTempModal.js";
import {UploadHtmlFileOnClodinary} from "../middleware/Cloudinary.js"
import fs from "fs";
export const createEmailTemplates = async (req, res) => {
  // console.log(req.body, req.file);

  try {
    const { name, subject, category } = req.body;
    if (!req.file) {
      return res.send({
        sucess: false,
        message: "please  provide a template file !",
      });
    }

    if (!name || !subject) {
      return res.send({
        sucess: false,
        message: "please fill all the mendatory fields!",
      });
    }

    const htmlContent = await fs.readFileSync(req.file.path, "utf-8");
    const outputPath = req.file?.path; // Use optional chaining to avoid crashes
    if (!outputPath) {
      return res.status(400).json({ error: "File path is required." });
    }
    const imagepath = await GenratehtmlPreviewImage(htmlContent, outputPath);
    const priviewimageurl= await UploadHtmlFileOnClodinary(imagepath)
    // const priviewimageurl = await console.log(imagepath, outputPath);
    // console.log(priviewimageurl)

    const newTemplate = new emailTempModal({
      name,
      subject,
      htmlContent,
      category,
      previewimg:priviewimageurl
    });

    await newTemplate.save();

    // unlink the files 
    fs.unlinkSync(imagepath)
    fs.unlinkSync(outputPath)

   
    return res.send({
      sucess: true,
      message: "saved successfully",
      newTemplate,
    });
  } catch (error) {
    console.log(error);
    return res.send({ sucess: false, message: error?.message });
  }
};

export const GetEmailTemplates = async (req, res) => {
  try {
    const { limit, page } = req.query;

    const Emaildata = await emailTempModal.find().sort({ createdAt: 1 });
    return res.send({
      sucess: true,
      message: "get all EmaitTemplates successfully",
      Emaildata,
    });
  } catch (error) {
    console.log(error);
    return res.send({ sucess: false, message: error?.message });
  }
};

export const SingleEmailtemplate = async(req, res) => {
  const id=req.params.id;
  console.log(id)
  try {
    const singleemaildata=await emailTempModal.findById(id);
    return res.send({
      sucess: true,
      message: "get all EmaitTemplates successfully",
      singleemaildata,
    });

    
  } catch (error) {
    console.log(error);
  }
};
