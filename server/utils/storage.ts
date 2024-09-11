
//@ts-nocheck
import multer from 'multer'



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "assets");
    },
    filename: function(req:any, file:{ mimetype: string; }, cb) {
         cb(null, file.originalname)
    
     }
})

const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/avif"]
    if (allowedFileTypes.includes(file.mimetype) ){
   cb(null, true)
    }else {
        cb(null, false)
    }
}

export const upload = multer({storage, fileFilter})



