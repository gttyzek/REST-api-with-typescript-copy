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
exports.pagination = void 0;
function pagination(model) {
    return function paginate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = req.query.page;
            const params__ = req.query.limit;
            const page = parseInt(params);
            const limit = parseInt(params__);
            if (!page && !limit) {
                const result = yield model.find().exec();
                // console.log(result)
                if (result.length === 0) {
                    res.status(404).send({
                        status: "Failed",
                        result,
                    });
                    return;
                }
                res.status(200).send({
                    status: "success",
                    result,
                });
                return;
            }
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const result = {};
            if (endIndex < (yield model.countDocuments().exec())) {
                result.next = {
                    page: page + 1,
                    limit: limit,
                };
            }
            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit,
                };
            }
            try {
                result.users = yield model.find().limit(limit).skip(startIndex).exec();
                //   res.status(200).send(result);
                res.paginatedResult = result;
                next();
            }
            catch (err) {
                res.status(404).json({
                    status: "fail",
                    message: err,
                });
            }
        });
    };
}
exports.pagination = pagination;
//# sourceMappingURL=paginate.js.map