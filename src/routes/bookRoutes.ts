import express from "express";
import { protect } from "../middleware/jwt.authorization";
import {
  getHomePage,
  getBook,
  getMyBooks,
  getAllBooks,
  getAddBookPage,
  createBook,
  getUpdateBookPage,
  updateBook,
  deleteBook,
} from "../controllers/bookControllers";
import { multerUploads } from '../middleware/multer';
import { pagination } from "../utils/paginate";
import Book from '../models/bookModels';

const router = express.Router();

//book routes
router.get("/home", getHomePage);
router.get("/book/:id", protect, getBook);
router.get("/books", protect, pagination(Book), getAllBooks);
router.get("/create", protect, getAddBookPage);
router.get("/books/myBooks", protect, getMyBooks);
router.get("/update/:id", protect, getUpdateBookPage);
router.post("/create", protect, multerUploads.single('images'), createBook);
router.post("/update/:id", protect, multerUploads.single('images'), updateBook);
router.get("/delete/:id", protect, deleteBook);

// module.exports = router;
export default router;
