import express from 'express';
const router = express.Router();

//Controllers
import * as AuthController from '../controllers/AuthController';
import * as UserController from '../controllers/UserController';
//Middleware
import * as AuthMiddleware from '../middlewares/Auth';
//Validator
import * as AuthValidator from '../validators/AuthValidator';
import * as UserValidator from '../validators/UserValidator';


router.post("/signin", AuthValidator.signIn, AuthController.signIn);
router.post("/signup", AuthValidator.signUp, AuthController.signUp);
router.get("/me", AuthMiddleware.auth, UserController.info);
router.put("/me", UserValidator.editAction, AuthMiddleware.auth, UserController.editAction);

export default router;