import { Request, Response } from "express";
import Book from '../models/bookModels';
import Author from '../models/authorModels';
import { JwtPayload } from "jsonwebtoken";


//@desc     Get Homepage
//@route    GET '/authors' 
//@access   Public
export const getHomePage = async (req: Request, res: Response) => {
    try {
      return res.render('homepage', { title: 'Home', token: '' });
    } catch (error) {
      console.log(error);
    }
  }

// @description   Gets a book
// @route         GET /books/:id
// @access        Private
export const getBook = async (req: JwtPayload, res: Response) => {
    try {
        const token = req.cookies.token;
        const id = req.params.id
       
        const book = await Book.findById(id);

        if(!book) {
            res.status(400).json({ "error": "true", "message": "Book not found" })
        }

        // const author = req.author._id
        // const author = await Author.findById(id).populate('books') as any
        // const authorBook = author.books;
      
        return res.status(200).render('getBook', { title: 'Book', book, token });
    } catch (error) {
        console.log(error)
       return res.status(400).json(error);
    }
    
}

// @description   Gets all book
// @route         GET /books
// @access        Private 
export const  getAllBooks = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(400).render('login')
        }
            
        const books = await Book.find();

        return res.status(200).render('dashboard', { title: 'Books', books, token });
    


    } catch (error) {
        console.log(error)
       return res.status(400).json(error);
    }
};

// @description   Get authors books
// @route         GET /books/mybooks
// @access        Private
export const getMyBooks = async (req: JwtPayload, res: Response) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(400).render('login')
        }
        const id = req.author._id;
        const author = await Author.findById(id).populate('books') as any
        const authorBook = author.books;

        return res.status(200).render('getMyBooks', { title: 'My Books', token, authorBook })
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('No author Books found')
    }
};

// @description   Get Create Book Page
// @route         GET /create
// @access        Private
export const getAddBookPage = async (req: Request, res: Response) => {
    try { 
        const token = req.cookies.token;
    if(!token) {
        return res.status(401).render('login')
    } else {

        return res.status(200).render('addBook', { title: 'Add Book', token });
    }
    } catch (error) {
        console.log(error);
    }
};

// @description   Create a book
// @route         POST /books/create
// @access        Private
export const createBook = async (req: JwtPayload, res: Response) => {
    const id = req.author.id
    const token = req.cookies.token;
    if(!token) {
        return res.status(400).render('login');
    }
    const author = await Author.findById(id).populate('books')
  
    // const files = req.files as [Express.Multer.File];
    // console.log(files)
    // const Images = files.map(
    //     (file: Express.Multer.File) => file.filename
    // )

    const book = await Book.create({
        title: req.body.title,
        datePublished: req.body.datePublished,
        description: req.body.description,
        pageCount: req.body.pageCount,
        genre: req.body.genre,
        publisher: req.body.publisher,
        bookSummary: req.body.bookSummary,
        images: req.file.path
    });
    
    author?.books.push(book)
    author?.save()
    const myBooks = author?.books;

    return res.status(201).redirect('/books/myBooks');
    // render('getMyBooks', { title: 'My Books', myBooks, token });
};

// @description   Get Update Book Page
// @route         GET /update/:id
// @access        Private
export const getUpdateBookPage = async (req: Request, res: Response) => {
    try { 
        const token = req.cookies.token;
    if(!token) {
        return res.status(401).render('login')
    } else {
       
        const book = await Book.findById(req.params.id)
        return res.status(200).render('updateBook', { title: 'Update Book', book, token });
    }
    } catch (error) {
        console.log(error);
    }
};

// @description   Update a book
// @route         PUT /books/update/:id
// @access        Private
export const updateBook = async (req: JwtPayload, res: Response) => {
    const id = req.params.id;
    const book = await Book.findById(id);

    if(!book) {
        res.status(400)
        throw new Error('Book not found');
    }

    const updatedBook = await Book.findByIdAndUpdate(id, {
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
    })

    // const books = await Book.find()
    return res.status(201).redirect('/books/myBooks')
};

// @description   Delete a book
// @route         DELETE /books/delete/:id
// @access        Private
export const deleteBook = async (req: Request, res: Response) => {
  
    const id = req.params.id;
    const book = await Book.findById(id);
    if(!book) {
        res.status(400)
        throw new Error('Book not found')
    }
    await Book.findByIdAndDelete(id);
    return res.status(200).redirect('/books/myBooks');
};