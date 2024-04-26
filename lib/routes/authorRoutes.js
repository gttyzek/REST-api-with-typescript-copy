"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateInput_1 = require("../middleware/validateInput");
const authorControllers_1 = require("../controllers/authorControllers");
const jwt_authorization_1 = require("../middleware/jwt.authorization");
const router = express_1.default.Router();
//author routes
router.get('/register', authorControllers_1.getRegisterPage);
router.get('/login', authorControllers_1.getLoginPage);
router.post('/login', (0, validateInput_1.validate)(validateInput_1.loginAuthorSchema), authorControllers_1.loginAuthor);
router.post('/register', (0, validateInput_1.validate)(validateInput_1.createAuthorSchema), authorControllers_1.registerAuthor);
router.get('/logout', jwt_authorization_1.protect, authorControllers_1.logoutAuthor);
// module.exports = router;
exports.default = router;
//# sourceMappingURL=authorRoutes.js.map