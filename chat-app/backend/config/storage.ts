import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 🚀 Max file size limit 50MB (handles video recordings smoothly)
    }
});