"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_authorization_1 = require("../middleware/jwt.authorization");
const bookControllers_1 = require("../controllers/bookControllers");
const multer_1 = require("../middleware/multer");
const router = express_1.default.Router();
//book routes
router.get("/home", bookControllers_1.getHomePage);
router.get("/book/:id", jwt_authorization_1.protect, bookControllers_1.getBook);
router.get("/books", jwt_authorization_1.protect, bookControllers_1.getAllBooks);
router.get("/create", jwt_authorization_1.protect, bookControllers_1.getAddBookPage);
router.get("/books/myBooks", jwt_authorization_1.protect, bookControllers_1.getMyBooks);
router.get("/update/:id", jwt_authorization_1.protect, bookControllers_1.getUpdateBookPage);
router.post("/create", jwt_authorization_1.protect, multer_1.multerUploads.single('images'), bookControllers_1.createBook);
router.post("/update/:id", jwt_authorization_1.protect, multer_1.multerUploads.single('images'), bookControllers_1.updateBook);
router.get("/delete/:id", jwt_authorization_1.protect, bookControllers_1.deleteBook);
// module.exports = router;
exports.default = router;
//# sourceMappingURL=bookRoutes.js.map