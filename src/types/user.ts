export interface IUser{
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  shortUrls?: ShortUrl[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type UpdateUser = Pick<IUser, "name" | "avatar" | "shortUrls" | "id">;

export type ShortUrl = {
  full_url: string
  short_url: string
  clicks: number
  createdAt?: Date
  userId?: string
}