"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploads = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            folder: 'NOVELS'
        };
    }),
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
exports.multerUploads = (0, multer_1.default)({ storage: storage });
// array('images', 10);
// uploadRouter.post('/images', upload.single("image"), async (req: Request, res: Response, ) => {
//     return res.json( { image: req.file?.path });
// })
// export = uploadRouter;
//# sourceMappingURL=multer.js.map