import { Schema, model } from "mongoose";
import Author from './authorModels'

export interface IBook {
  // author: Schema.Types.ObjectId;
  title: String,
  datePublished: String,
  description: String,
  pageCount: Number,
  genre: String
  publisher: String
  bookSummary: String,
  images: String,
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema(
  {
    // author: { type: Schema.Types.ObjectId, ref: "Author" },
    title: { type: String, required: true },
    datePublished: { type: String, required: true },
    description: { type: String, required: true },
    pageCount: { type: Number, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    bookSummary: { type: String, required: true },
    images: { type: String },
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook>("Book", bookSchema);

export default Book;
