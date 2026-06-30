"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = uploadToCloudinary;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
function uploadToCloudinary(fileBuffer, folder = "Actify") {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            folder,
        }, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result.secure_url);
        });
        streamifier_1.default.createReadStream(fileBuffer).pipe(stream);
    });
}
