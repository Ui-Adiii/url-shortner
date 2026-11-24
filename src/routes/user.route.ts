import express from 'express'


import { createUser, getMe, loginUser, logoutUser } from '../controllers/user.controller.js';
import { loginValidator, registerValidator } from '../validations/user.validation.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';


const userRouter = express.Router()

userRouter.post("/register", registerValidator, validate, createUser);
userRouter.post("/login", loginValidator, validate,loginUser);
userRouter.get("/logout",logoutUser);
userRouter.get("/me",authMiddleware,getMe);

export default userRouter