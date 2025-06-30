import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/upload/uploadImage";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadImage);

export default router;
