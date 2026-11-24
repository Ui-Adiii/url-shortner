import express from 'express'

import { createUser, loginUser } from '../controllers/user.controller.js';
import { loginValidator, registerValidator } from '../validations/user.validation.js';
import { validate } from '../middlewares/validate.middleware.js';


const userRouter = express.Router()

userRouter.post("/register", registerValidator, validate, createUser);
userRouter.post("/login", loginValidator, validate,loginUser);

export default userRouter