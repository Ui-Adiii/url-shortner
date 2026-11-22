import { db } from "../prisma/db";
import type { IUser, UpdateUser } from "../types/user";

class UserRepository {
  createUser({
    name,
    email,
    password,
    avatar,
  }: IUser) {
    return db.orm.public.User.create({
      name,
      email,
      password,
      avatar,
    });
  }

  updateUser({
    id,
    name,
    avatar,
  }: UpdateUser) {

    return db.orm.public.User.where({id}).update({
      name,
      avatar,
    });
  }

  getUser({ id }: {id:string}){
    return db.orm.public.User.where({ id }).first();
  }

  deleteUser({ id }: { id: string }) {
    return db.orm.public.User.where({id}).delete();
  }
}

export default new UserRepository();
