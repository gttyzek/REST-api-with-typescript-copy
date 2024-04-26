
interface InewBook {
  title: String,
  datePublished: Date,
  description: String,
  pageCount: Number,
  genre: String
  publisher: String
}

interface IupdateBook {
  title: String,
  datePublished: Date,
  description: String,
  pageCount: Number,
  genre: String
  publisher: String
}

interface IAuthor{
    email: string;
    name: string;
    password: string;
    phone: string
    createdAt: Date;
    updatedAt: Date;
}


// declare namespace Express {
//     interface Request {
//         author?: IAuthor;
//     }
//   }