import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLODINARY_NAME,
  api_key: process.env.CLODINARAY_APIKEY,
  api_secret: process.env.CLODINARY_SECREATE,
});

export default cloudinary;