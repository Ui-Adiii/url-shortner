export interface IShortUrl { 
  id?: string,
  fullUrl: string,
  short?: string,
  clicks?: number,
  createdAt?: Date,
  userId: string,
}