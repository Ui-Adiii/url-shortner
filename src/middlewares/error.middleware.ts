import type { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/AppError.js";


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isOperational = err instanceof AppError;

  const statusCode = isOperational ? err.statusCode : 500;

  return res.status(statusCode).json({
    success: false,
    message: isOperational ? err.message : "Internal Server Error",
  });
};
