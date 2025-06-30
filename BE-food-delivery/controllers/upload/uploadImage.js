"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file || !req.file.buffer) {
        res.status(400).json({ error: "No file provided" });
        return;
    }
    try {
        const result = yield new Promise((resolve, reject) => {
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
});
exports.uploadImage = uploadImage;
