"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        res.json({
            message: err.message,
            stack: err.stack,
        });
        // render the error page
        const statusCode = res.statusCode ? res.statusCode : 500;
        res.status(statusCode);
        res.render('error');
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map