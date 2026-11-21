import userRepository from "../repositories/user.repository.js";

class UserService {
  async createUser(data: {
    name: string;
    email: string;
    hash: string;
    avatar: string;
  }) {
    return userRepository.createUser(data);
  }

  async updateUser(data: { id: string; name: string; avatar: string }) {
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
