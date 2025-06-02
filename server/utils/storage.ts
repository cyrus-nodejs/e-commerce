
//@ts-nocheck
import multer from 'multer'
import path from 'path';
const cloudinary = require('cloudinary').v2;


import { CloudinaryStorage } from 'multer-storage-cloudinary';


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'CloudinaryDemo',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

// export const upload = multer({ storage });

 const  uploadMiddleware = (folderName) => {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: (req, file) => {
        const folderPath = `${folderName.trim()}`; // Update the folder path here
        const fileExtension = path.extname(file.originalname).substring(1);
        const publicId = `${file.fieldname}-${Date.now()}`;
        
        return {
          folder: folderPath,
          public_id: publicId,
          format: fileExtension,
        };
      },
    });
  
    return multer({
      storage: storage,
      limits: {
        fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
      },
    });
  }


  export const upload = uploadMiddleware("SHOP-HERE");
