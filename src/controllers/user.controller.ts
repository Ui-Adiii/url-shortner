import userService from "../services/user.service";
import type { Request, Response } from "express";
const createUser = async (req:Request, res:Response) => { 
  try {
    const {name,email,password } = req.body;
    if (!name || !email || !password) { 
      return res.status(400).json({
        message: "All Fields are required",
        success: false
      })
    }

    const hash = password;
    const user = await userService.createUser({ name, email,password:hash,avatar:null });

    return res.status(201).json({
      message: "user registered successfully",
      success: true,
      data:user
    })

  } catch (error:unknown) {
    return res.status(500).json({
      message:  error instanceof Error ? error.message : "Internal Server Error",
      success:false
    })
  }
}


export {createUser};