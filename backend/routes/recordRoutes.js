import express from "express";
import protect from "../middleware/authMiddleware.js"; 
import { createRecord,getRecords,getRecordById,updateRecord,deleteRecord } from "../controllers/recordController.js";
import upload from "../config/multer.js";
const router = express.Router();



// Routes
router.post("/", protect, upload.single("image"), createRecord);
router.get("/", protect, getRecords);
router.get("/:id", protect, getRecordById);
router.put("/:id", protect, upload.single("image"), updateRecord);
router.delete("/:id", protect, deleteRecord);

export default router;