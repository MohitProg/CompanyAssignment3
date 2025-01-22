import mongoose from "mongoose";

const emailtempSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    htmlContent: {
      type: String,
      required: true,
    },
    isResponsive: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      default: "General",
    },
    previewimg:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Emaildata", emailtempSchema);
