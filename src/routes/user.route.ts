import express from 'express'


import { createUser, getMe, loginUser, logoutUser } from '../controllers/user.controller.js';
import { loginValidator, registerValidator } from '../validations/user.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';


const userRouter = express.Router()

userRouter.post("/register",upload.single('avatar'), registerValidator, validate, createUser);
userRouter.post("/login", loginValidator, validate,loginUser);
userRouter.get("/logout",logoutUser);
userRouter.get("/me",authMiddleware,getMe);

export default userRouter