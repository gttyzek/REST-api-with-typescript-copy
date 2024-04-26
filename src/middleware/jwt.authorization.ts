import jwt from 'jsonwebtoken';
import Author, { IAuthor } from "../models/authorModels";
import express, { Request, Response, NextFunction } from 'express';


interface JwtPayload {
    id: string
}

declare global {
    namespace Express {
      interface Request {
        author?: Record<string, any> | null | undefined
        
      }
    }
  }

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token
    if(req.cookies.token) {
    try {
            //Get token from cookie
            token = req.cookies.token;
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
          
            //Get author from token
            const { id } = decoded 
            
            req.author = await Author.findById(id)
          
            if (!req.author) {
                res.status(400)
                //throw new Error('Not authorized, invalid token' );
                res.redirect('/authors/login');
            } else {
                return next();
            }


        }   catch (error) {
            console.log(error);
            res.status(400)
            res.redirect('/authors/login');
            //throw new Error('Not authorized, invalid token')
        }
    }   else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token header
            token = req.headers.authorization.split(' ')[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

            //Get author from token

            const { id } = decoded 

            req.author = await Author.findById(id);

            if (!req.author) {
                res.status(400)
                res.redirect('/authors/login');
                //throw new Error('Not authorized, invalid token')
            } else {
                return next();
            };

        } catch (error) {
            console.log(error);
            res.status(400)
            res.redirect('/authors/login');
            //throw new Error('Not authorized, invalid token')
            };
        };

    if(!token) {
    res.status(401)
    res.redirect('/authors/login');
    //throw new Error('Not authorized, no token');
    };
};