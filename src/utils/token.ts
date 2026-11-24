import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "./AppError";

dotenv.config();


export const signToken = (payload: { id: string }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): string => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  
    if (typeof decoded === "string" || !decoded.id) {
      throw new AppError("Unauthorized", 401);
    }
  return decoded.id;
};
