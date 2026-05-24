import {v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    cloud_api_key:process.env.CLOUD_API_KEY,
    cloud_api_secret:process.env.CLOUD_API_SECRET,
});

export async function uploadToCloudinary(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "chat-images" },
            (error, result) => {
                if (error || !result) return reject(error);
                resolve(result.secure_url);
            }
        ).end(buffer);
    });
}

export default cloudinary;