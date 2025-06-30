"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const uploadImage = async (req, res) => {
    if (!req.file || !req.file.buffer) {
        res.status(400).json({ error: "No file provided" });
        return;
    }
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary_1.default.uploader.upload_stream({
                resource_type: "image",
                folder: "foods",
            }, (error, result) => {
                if (error || !result) {
                    return reject(error || new Error("Upload failed"));
                }
                resolve(result);
            });
            stream.end(req.file.buffer); // ✅ send buffer to cloudinary
        });
        res.json({ url: result.secure_url });
        return;
    }
    catch (err) {
        res.status(500).json({ error: err.message || "Upload failed" });
        return;
    }
};
exports.uploadImage = uploadImage;
