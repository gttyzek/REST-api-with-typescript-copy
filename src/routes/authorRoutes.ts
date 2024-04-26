import express from  "express";
import { validate, createAuthorSchema, loginAuthorSchema } from '../middleware/validateInput';
import { registerAuthor, loginAuthor, logoutAuthor, getRegisterPage, getLoginPage } from '../controllers/authorControllers'
import { protect } from "../middleware/jwt.authorization";
const router = express.Router();

//author routes

router.get('/register', getRegisterPage);
router.get('/login', getLoginPage);
router.post('/login', validate(loginAuthorSchema), loginAuthor);
router.post('/register', validate(createAuthorSchema), registerAuthor);
router.get('/logout', protect, logoutAuthor);



// module.exports = router;
export default router
