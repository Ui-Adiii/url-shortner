import urlRepository from "../repositories/url.repository.js";
import type { IShortUrl } from "../types/url.js";
import { generateNanoId } from "../utils/shortUrl.js";

class UrlService {
  createShortUrl(data: Pick<IShortUrl, "fullUrl" | "userId">) {
    const short = generateNanoId();
    return urlRepository.saveUrl({
      fullUrl: data.fullUrl,
      short,
      userId: data.userId,
    });
  }
  getUrlById(short: string) {
    return urlRepository.getShortUrl(short);
  }
  getAllShortUrls(
    userId: string,
    page: number ,
    limit: number,
    order: "asc" | "desc",
  ) {

    return urlRepository.getAllShortUrls(userId, limit, page, order);
  }
}

export default new UrlService()