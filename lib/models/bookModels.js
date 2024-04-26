"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    // author: { type: Schema.Types.ObjectId, ref: "Author" },
    title: { type: String, required: true },
    datePublished: { type: String, required: true },
    description: { type: String, required: true },
    pageCount: { type: Number, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    bookSummary: { type: String, required: true },
    images: { type: String },
}, {
    timestamps: true,
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
//# sourceMappingURL=bookModels.js.map