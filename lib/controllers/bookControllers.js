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
exports.deleteBook = exports.updateBook = exports.getUpdateBookPage = exports.createBook = exports.getAddBookPage = exports.getMyBooks = exports.getAllBooks = exports.getBook = exports.getHomePage = void 0;
const bookModels_1 = __importDefault(require("../models/bookModels"));
const authorModels_1 = __importDefault(require("../models/authorModels"));
//@desc     Get Homepage
//@route    GET '/authors' 
//@access   Public
const getHomePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.render('homepage', { title: 'Home', token: '' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getHomePage = getHomePage;
// @description   Gets a book
// @route         GET /books/:id
// @access        Private
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const id = req.params.id;
        const book = yield bookModels_1.default.findById(id);
        if (!book) {
            res.status(400).json({ "error": "true", "message": "Book not found" });
        }
        // const author = req.author._id
        // const author = await Author.findById(id).populate('books') as any
        // const authorBook = author.books;
        return res.status(200).render('getBook', { title: 'Book', book, token });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.getBook = getBook;
// @description   Gets all book
// @route         GET /books
// @access        Private 
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).render('login');
        }
        const books = yield bookModels_1.default.find();
        return res.status(200).render('dashboard', { title: 'Books', books, token });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.getAllBooks = getAllBooks;
// @description   Get authors books
// @route         GET /books/mybooks
// @access        Private
const getMyBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).render('login');
        }
        const id = req.author._id;
        const author = yield authorModels_1.default.findById(id).populate('books');
        const authorBook = author.books;
        // const files = req.files as [Express.Multer.File];
        // const Images = files.map(
        // (file: Express.Multer.File) => file.filename
        // )
        return res.status(200).render('getMyBooks', { title: 'My Books', token, authorBook });
    }
    catch (error) {
        console.log(error);
        res.status(400);
        throw new Error('No author Books found');
    }
});
exports.getMyBooks = getMyBooks;
// @description   Get Create Book Page
// @route         GET /create
// @access        Private
const getAddBookPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).render('login');
        }
        else {
            return res.status(200).render('addBook', { title: 'Add Book', token });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAddBookPage = getAddBookPage;
// @description   Create a book
// @route         POST /books/create
// @access        Private
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.author.id;
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).render('login');
    }
    const author = yield authorModels_1.default.findById(id).populate('books');
    // const files = req.files as [Express.Multer.File];
    // console.log(files)
    // const Images = files.map(
    //     (file: Express.Multer.File) => file.filename
    // )
    const book = yield bookModels_1.default.create({
        title: req.body.title,
        datePublished: req.body.datePublished,
        description: req.body.description,
        pageCount: req.body.pageCount,
        genre: req.body.genre,
        publisher: req.body.publisher,
        bookSummary: req.body.bookSummary,
        images: req.file.path
    });
    author === null || author === void 0 ? void 0 : author.books.push(book);
    author === null || author === void 0 ? void 0 : author.save();
    const myBooks = author === null || author === void 0 ? void 0 : author.books;
    return res.status(201).redirect('/books/myBooks');
    // render('getMyBooks', { title: 'My Books', myBooks, token });
});
exports.createBook = createBook;
// @description   Get Update Book Page
// @route         GET /update/:id
// @access        Private
const getUpdateBookPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).render('login');
        }
        else {
            const book = yield bookModels_1.default.findById(req.params.id);
            return res.status(200).render('updateBook', { title: 'Update Book', book, token });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUpdateBookPage = getUpdateBookPage;
// @description   Update a book
// @route         PUT /books/update/:id
// @access        Private
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const book = yield bookModels_1.default.findById(id);
    if (!book) {
        res.status(400);
        throw new Error('Book not found');
    }
    const updatedBook = yield bookModels_1.default.findByIdAndUpdate(id, {
        title: req.body.title,
        datePublished: req.body.datePublished,
        description: req.body.description,
        pageCount: req.body.pageCount,
        genre: req.body.genre,
        publisher: req.body.publisher,
        bookSummary: req.body.bookSummary,
        images: req.file.path
    }, {
        new: true,
    });
    // const books = await Book.find()
    return res.status(201).redirect('/books/myBooks');
});
exports.updateBook = updateBook;
// @description   Delete a book
// @route         DELETE /books/delete/:id
// @access        Private
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const book = yield bookModels_1.default.findById(id);
    if (!book) {
        res.status(400);
        throw new Error('Book not found');
    }
    yield bookModels_1.default.findByIdAndDelete(id);
    return res.status(200).redirect('/books/myBooks');
});
exports.deleteBook = deleteBook;
//# sourceMappingURL=bookControllers.js.map