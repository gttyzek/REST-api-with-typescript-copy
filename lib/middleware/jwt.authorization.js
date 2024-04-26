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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorModels_1 = __importDefault(require("../models/authorModels"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.cookies.token) {
        try {
            //Get token from cookie
            token = req.cookies.token;
            //verify token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            //Get author from token
            const { id } = decoded;
            req.author = yield authorModels_1.default.findById(id);
            if (!req.author) {
                res.status(400);
                //throw new Error('Not authorized, invalid token' );
                res.redirect('/authors/login');
            }
            else {
                return next();
            }
        }
        catch (error) {
            console.log(error);
            res.status(400);
            res.redirect('/authors/login');
            //throw new Error('Not authorized, invalid token')
        }
    }
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token header
            token = req.headers.authorization.split(' ')[1];
            //Verify token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            //Get author from token
            const { id } = decoded;
            req.author = yield authorModels_1.default.findById(id);
            if (!req.author) {
                res.status(400);
                res.redirect('/authors/login');
                //throw new Error('Not authorized, invalid token')
            }
            else {
                return next();
            }
            ;
        }
        catch (error) {
            console.log(error);
            res.status(400);
            res.redirect('/authors/login');
            //throw new Error('Not authorized, invalid token')
        }
        ;
    }
    ;
    if (!token) {
        res.status(401);
        res.redirect('/authors/login');
        //throw new Error('Not authorized, no token');
    }
    ;
});
exports.protect = protect;
//# sourceMappingURL=jwt.authorization.js.map