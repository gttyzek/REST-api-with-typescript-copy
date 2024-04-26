import { Request, Response, NextFunction } from  "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from 'jsonwebtoken';
import Author, { IAuthor } from "../models/authorModels"
import Book from "../models/bookModels";

  
//@desc     Get register page
//@route    GET /authors/login
//@access   Public
export const getRegisterPage = async (req: Request, res: Response) => {
  res.render('register', { title: 'Register', token: '' });
};


  //@desc     Register new author
  //@route    POST /authors/register
  //@access   Public
  export const registerAuthor = async (req: Request, res: Response) => {
    try {
      const { name, email, password, phone } = req.body
  
      //Check if author exist
      const authorExists = await Author.findOne({ email });
  
      if(authorExists) {
        res.status(400)
        throw new Error('A user already exists with same email')
      }

      //Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
    
      //Create an author
      const author: IAuthor = await Author.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });
    
  
  
      if(author) {
        return res.status(201).redirect("/authors/login")
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
  
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid user data" });
    }
  };

  //@desc     Get login page
  //@route    GET /authors/login
  //@access   Public
export const getLoginPage =  async (req: Request, res: Response) => {
  res.render('login', { title: 'Login', token: ''});
};

  
  //@desc     Login author
  //@route    POST /authors/login
  //@access   Public
  export const loginAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
  
      // Check for author's email
      const author = await Author.findOne({ email });
  
      if(author && (await bcrypt.compare(password, author.password))) {
  
        // Store token in cookie
        const { id } = author
        const token = generateAccessToken(id)
        res.cookie("token", token);
        
        
        const books = await Book.find()
        return res.status(200).redirect('/books')
        
      } else {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };
  
  
  export const logoutAuthor = async (req: JwtPayload, res: Response) => {
    // const token = req.cookies.token
    // console.log("You have successfully logged out");
    res.clearCookie("token");

    if (typeof window !== 'undefined') {
      console.log('You are on the browser')
      // can use localStorage here
    } else {
      console.log('You are on the server')
      // can't use localStorage
    }
    
    // const remove = localStorage.clear();
    
    // { domain: 'http://localhost:3005', path: '/authors/logout' });
    await req.author.save();
    res.status(200).redirect('/authors/login');
  }

  //Generate a token
  function generateAccessToken(id: string) {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.sign({ id }, JWT_SECRET as string, {
      expiresIn: '30d'
    })
    
  }
  