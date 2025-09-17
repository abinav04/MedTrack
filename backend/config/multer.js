import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "medtrack_uploads", // folder name in cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "pdf"], // allow medical reports, etc.
  },
});

const upload = multer({ storage });

export default upload;
