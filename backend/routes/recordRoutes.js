import express from "express";
import multer from "multer"; 
import protect from "../middleware/authMiddleware.js"; 
import { createRecord,getRecords,getRecordById,updateRecord,deleteRecord } from "../controllers/recordController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/", protect, upload.single("image"), createRecord);
router.get("/", protect, getRecords);
router.get("/:id", protect, getRecordById);
router.put("/:id", protect, upload.single("image"), updateRecord);
router.delete("/:id", protect, deleteRecord);

export default router;