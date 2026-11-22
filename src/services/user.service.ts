import userRepository from "../repositories/user.repository.js";
import type { IUser, UpdateUser } from "../types/user.js";


class UserService {
  async createUser(data: IUser) {
    return userRepository.createUser(data);
  }

  async updateUser(data: UpdateUser) {
    return userRepository.updateUser(data);
  }

  async getUser(id: string) {
    return userRepository.getUser({ id });
  }

  async deleteUser(id: string) {
    return userRepository.deleteUser({ id });
  }
}

export default new UserService();
