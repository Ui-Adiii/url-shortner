import { db } from "../prisma/db.js";
import type { IShortUrl } from "../types/url.js";

class UrlRepository {
  saveUrl(data: Pick<IShortUrl, "fullUrl" | "userId" | "short">) {
    try {
      console.log(data.fullUrl, data.short, data.userId);

      return db.orm.public.ShortUrl.create({
        fullUrl: data.fullUrl,
        short: data.short as string,
        userId: data.userId,
      });
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  async getShortUrl(short: string) {
    try {
      const shortUrl = await db.orm.public.ShortUrl.where({ short }).first();

      if (!shortUrl) return null;

      return db.orm.public.ShortUrl.where({ short }).update({
        clicks: (shortUrl.clicks ?? 0) + 1,
      });
    } catch (error) {
      console.error(error)
      throw error;
    }
  }
}

export default new UrlRepository();
