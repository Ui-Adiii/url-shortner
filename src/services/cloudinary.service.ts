import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config()

class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
      api_key: process.env.CLOUDINARY_API_KEY as string,
      api_secret: process.env.CLOUDINARY_API_SECRET as string,
    });
  }

  async uploadFile(filePath: string, folder: string = "uploads"): Promise<string> {
   try {
     const result = await cloudinary.uploader.upload(filePath, {
       folder,
       resource_type: "auto",
     });

     console.log("Upload successful:", result.secure_url);

     return result.secure_url;
   } catch (error) {
     console.error("Cloudinary Error:", error);
     throw error;
   }
  }

  async deleteByUrl(url: string): Promise<void> {
    const publicId = url.split("/").pop()?.split(".")[0]
    if (publicId) {
      await cloudinary.uploader.destroy(publicId)
    }
  }
}

export default new CloudinaryService();