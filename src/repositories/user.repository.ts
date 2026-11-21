import { db } from "../prisma/db";

class UserRepository {
  createUser({
    name,
    email,
    hash,
    avatar,
  }: {
    name: string;
    email: string;
    hash: string;
    avatar: string;
  }) {
    return db.orm.public.User.create({
      name,
      email,
      password: hash,
      avatar,
    });
  }

  updateUser({
    id,
    name,
    avatar,
  }: {
    id:string
    name: string;
    avatar: string;
    }) {

    return db.orm.public.User.where({id}).update({
      name,
      avatar,
    });
  }

  getUser({ id }: {id:string}) {
    return db.orm.public.User.where({ id }).first();
  }

  deleteUser({ id }: { id: string }) {
    return db.orm.public.User.where({id}).delete();
  }
}

export default new UserRepository();
