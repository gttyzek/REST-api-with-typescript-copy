
import { Schema, model } from "mongoose";

export interface IAuthor {
  // id: any;
  _id: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  books: Array<Object>;
  createdAt: Date;
  updatedAt: Date;
}




const authorSchema = new Schema<IAuthor>(
  {
    // _id?: { type: Schema.Types.ObjectId },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    books: [
      {
        type: Schema.Types.ObjectId, ref: "Book"
      },
    ],
},
  {
    timestamps: true,
  }
);

const Author = model<IAuthor>("Author", authorSchema);

export default Author;
