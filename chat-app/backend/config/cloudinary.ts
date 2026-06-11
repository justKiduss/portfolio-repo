import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,       // Corrected key name
    api_secret: process.env.CLOUD_API_SECRET, // Corrected key name
});

export async function uploadToCloudinary(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { 
                folder: "chat-media",
                resource_type: "auto" 
            },
            (error, result) => {
                if (error || !result) return reject(error || new Error("Upload failed"));
                resolve(result.secure_url);
            }
        ).end(buffer);
    });
}

export default cloudinary;