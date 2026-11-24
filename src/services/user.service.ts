import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository.js";
import type { IUser, UpdateUser } from "../types/user.js";
import { AppError } from "../utils/AppError.js";


class UserService {
  async createUser(data: IUser) {
    const existedUser = await this.getUserByEmail(data.email);
    if (existedUser) {
      throw new AppError("User already existed",400);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;

    return userRepository.createUser(data);
  }
  async loginUser( data:Pick<IUser,"email" | "password">) {
     const user = await this.getUserByEmail(data.email);
    if (!user) { 
      throw new AppError("Invalid Credentials",400)
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) { 
      throw new AppError("Invalid Credentials",400);
    }
    return user;
  }

  async updateUser(data: UpdateUser) {
    return userRepository.updateUser(data);
  }

  async getUserById(id: string) {
    return userRepository.getUserById({ id });
  }

  async getUserByEmail(email: string) {
    return userRepository.getUserByEmail({ email });
  }


  async deleteUser(id: string) {
    return userRepository.deleteUser({ id });
  }
}

export default new UserService();
