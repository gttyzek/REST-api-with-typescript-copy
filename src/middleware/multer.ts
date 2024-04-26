import multer from 'multer';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary, 
    params: async (req, file) => {
        return {
            folder: 'NOVELS'
        }
    },
});

// const uploadRouter = express.Router();
// const storage = multer.memoryStorage()
//     destination: function (req, file, callback) {
//         callback(null, 'images')
//     },
//     filename: function (req, file, callback) {
//         callback(null, new Date().toISOString()+'_'+file.originalname)
//     }
// })

export const multerUploads = multer({ storage: storage })

// array('images', 10);

// uploadRouter.post('/images', upload.single("image"), async (req: Request, res: Response, ) => {
//     return res.json( { image: req.file?.path });
// })

// export = uploadRouter;
