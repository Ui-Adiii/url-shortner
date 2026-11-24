import { db } from "../prisma/db.js";
import type { IUser, UpdateUser } from "../types/user.js";

class UserRepository {
  
  createUser({ name, email, password, avatar }: IUser) {
    return db.orm.public.User.create({
      name,
      email,
      password,
      avatar,
    });
  }

  updateUser({ id, name, avatar }: UpdateUser) {
    return db.orm.public.User.where({ id }).update({
      name,
      avatar,
    });
  }

  getUserById({ id }: { id: string }) {
    return db.orm.public.User.where({ id }).first();
  }

  getUserByEmail({ email }: { email: string }) {
    return db.orm.public.User.where({ email }).first();
  }

  deleteUser({ id }: { id: string }) {
    return db.orm.public.User.where({ id }).delete();
  }
}

export default new UserRepository();
