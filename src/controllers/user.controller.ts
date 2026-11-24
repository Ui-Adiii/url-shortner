import type { Request, Response } from "express";

import userService from "../services/user.service.js";
import { signToken } from "../utils/token.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await userService.createUser({
    name,
    email,
    password,
    avatar: null,
  });

  const token = signToken({ id: user.id });

  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    })
    .status(201)
    .json({
      message: "user registered successfully",
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { password, email } = req.body;

  const user = await userService.loginUser({ email, password });

  const token = signToken({ id: user.id });

  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    })
    .status(200)
    .json({
      message: "user Login successfully",
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
});

export { createUser, loginUser };
