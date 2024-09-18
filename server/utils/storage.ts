
//@ts-nocheck
import multer from 'multer'
import path from 'path';
const cloudinary = require('cloudinary').v2;


import { CloudinaryStorage } from 'multer-storage-cloudinary';
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "assets");
//     },
//     filename: function(req:any, file:{ mimetype: string; }, cb) {
//          cb(null, file.originalname)
    
//      }
// })

// const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void) => {
//     const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/avif"]
//     if (allowedFileTypes.includes(file.mimetype) ){
//    cb(null, true)
//     }else {
//         cb(null, false)
//     }
// }

// export const upload = multer({storage, fileFilter})


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
