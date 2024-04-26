import { Request, Response, NextFunction } from "express";
import { AnyZodObject, object, string, TypeOf } from "zod";

export const createAuthorSchema = object({
    body: object({
      name: string({
        required_error: "Name is required",
      })
        .min(3, "Name must be at least 6 character(s)")
        .max(30),
  
      password: string({
        required_error: "Passowrd is required",
      }).min(6, "Password must be at least 6 character(s)"),
  
      confirmPassword: string({
        required_error: "Confirm Password is required",
      }),
  
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),

      phone: string ({
        required_error: "Phone number is required",
      })
      .min(11, 'Phone number must be at least 11 character(s)'),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ['confirmPassword'],
    }),
  });



export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        return next();
    } catch (error: any) {
        return res.status(400).json(error)
        
        // throw new Error('Invalid user details')
    }
}


export const loginAuthorSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 character(s)'),
  }),
});