import { Response, Request } from "express";
import cloudinary from "../../utils/cloudinary";

// Extend Request to include Multer file
interface UploadRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadImage = async (req: UploadRequest, res: Response) => {
  if (!req.file || !req.file.buffer) {
    res.status(400).json({ error: "No file provided" });
    return;
  }

  try {
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "foods",
          },
          (error, result) => {
            if (error || !result) {
              return reject(error || new Error("Upload failed"));
            }
            resolve(result);
          }
        );

        stream.end(req.file!.buffer); // ✅ send buffer to cloudinary
      }
    );

    res.json({ url: result.secure_url });
    return;
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Upload failed" });
    return;
  }
};
