import type { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/token.js";
import { AppError } from "../utils/AppError.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const userId = verifyToken(token);
    if (!userId) throw new AppError("unauthorized", 401);
    req.userId = userId;
    next()
    
  } catch (error) {
    throw new AppError("unauthorized" , 401)
  }
};

export { authMiddleware }