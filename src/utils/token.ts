import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface TokenPayload extends JwtPayload {
  id: string;
}

export const signToken = (payload: { id: string }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): string => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
  return decoded.id;
};
