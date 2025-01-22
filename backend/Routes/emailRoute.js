import { Router } from "express";
import { createEmailTemplates, GetEmailTemplates, SingleEmailtemplate } from "../controllers/emailControllers.js";
import { upload } from "../middleware/multer.js";

const route=Router();

// route for adding templates 
route.post("/uploadEmailConfig",upload.single("htmlcontent"),  createEmailTemplates);
// route for getting email templates
route.get("/getEmailLayout",GetEmailTemplates);
// route for getting single email templates 
route.get("/getEmailLayout/:id",SingleEmailtemplate);


export default route;