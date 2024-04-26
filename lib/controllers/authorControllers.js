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
exports.logoutAuthor = exports.loginAuthor = exports.getLoginPage = exports.registerAuthor = exports.getRegisterPage = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorModels_1 = __importDefault(require("../models/authorModels"));
const bookModels_1 = __importDefault(require("../models/bookModels"));
//@desc     Get register page
//@route    GET /authors/login
//@access   Public
const getRegisterPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('register', { title: 'Register', token: '' });
});
exports.getRegisterPage = getRegisterPage;
//@desc     Register new author
//@route    POST /authors/register
//@access   Public
const registerAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone } = req.body;
        //Check if author exist
        const authorExists = yield authorModels_1.default.findOne({ email });
        if (authorExists) {
            res.status(400);
            throw new Error('A user already exists with same email');
        }
        //Hash password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        //Create an author
        const author = yield authorModels_1.default.create({
            name,
            email,
            phone,
            password: hashedPassword,
        });
        if (author) {
            return res.status(201).redirect("/authors/login");
            // //json({
            //   _id: author._id,
            //   name: author.name,
            //   email: author.email,
            //   phone: author.phone
            // });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Invalid user data" });
    }
});
exports.registerAuthor = registerAuthor;
//@desc     Get login page
//@route    GET /authors/login
//@access   Public
const getLoginPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('login', { title: 'Login', token: '' });
});
exports.getLoginPage = getLoginPage;
//@desc     Login author
//@route    POST /authors/login
//@access   Public
const loginAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check for author's email
        const author = yield authorModels_1.default.findOne({ email });
        if (author && (yield bcrypt_1.default.compare(password, author.password))) {
            // Store token in cookie
            const { id } = author;
            const token = generateAccessToken(id);
            res.cookie("token", token);
            // { domain: 'http://localhost:3005', path: '/authors/logout' });
            const books = yield bookModels_1.default.find();
            return res.status(200).redirect('/books');
            // .render('dashboard', { title: 'Books', books, token })  
            // json({
            //   name: author.name,
            //   id: author.id,
            //   email: author.email,
            //   token: token
            // })
        }
        else {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.loginAuthor = loginAuthor;
const logoutAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const token = req.cookies.token
    // console.log("You have successfully logged out");
    res.clearCookie("token");
    if (typeof window !== 'undefined') {
        console.log('You are on the browser');
        // can use localStorage here
    }
    else {
        console.log('You are on the server');
        // can't use localStorage
    }
    // const remove = localStorage.clear();
    // { domain: 'http://localhost:3005', path: '/authors/logout' });
    yield req.author.save();
    res.status(200).redirect('/authors/login');
});
exports.logoutAuthor = logoutAuthor;
//Generate a token
function generateAccessToken(id) {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET, {
        expiresIn: '30d'
    });
}
//# sourceMappingURL=authorControllers.js.map