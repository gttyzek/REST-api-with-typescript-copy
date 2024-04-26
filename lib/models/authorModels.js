"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authorSchema = new mongoose_1.Schema({
    // _id?: { type: Schema.Types.ObjectId },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    books: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: "Book"
        },
    ],
}, {
    timestamps: true,
});
const Author = (0, mongoose_1.model)("Author", authorSchema);
exports.default = Author;
//# sourceMappingURL=authorModels.js.map