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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAuthorSchema = exports.validate = exports.createAuthorSchema = void 0;
const zod_1 = require("zod");
exports.createAuthorSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        })
            .min(3, "Name must be at least 6 character(s)")
            .max(30),
        password: (0, zod_1.string)({
            required_error: "Passowrd is required",
        }).min(6, "Password must be at least 6 character(s)"),
        confirmPassword: (0, zod_1.string)({
            required_error: "Confirm Password is required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
        phone: (0, zod_1.string)({
            required_error: "Phone number is required",
        })
            .min(11, 'Phone number must be at least 11 character(s)'),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ['confirmPassword'],
    }),
});
const validate = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        return next();
    }
    catch (error) {
        return res.status(400).json(error);
        // throw new Error('Invalid user details')
    }
});
exports.validate = validate;
exports.loginAuthorSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email'),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        })
            .min(6, 'Phone number must be at least 6 character(s)'),
    }),
});
//# sourceMappingURL=validateInput.js.map