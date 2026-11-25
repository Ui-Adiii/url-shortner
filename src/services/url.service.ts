import urlRepository from "../repositories/url.repository.js";
import type { IShortUrl } from "../types/url.js";
import { generateNanoId } from "../utils/shortUrl.js";

class UrlService {
  createShortUrl(data: Pick<IShortUrl,"fullUrl"|"userId">) {
    const short = generateNanoId();
    return urlRepository.saveUrl({fullUrl:data.fullUrl,short,userId:data.userId});
  }
  getUrlById(id: string) { 
    return urlRepository.getShortUrl(id);
  }
}

export default new UrlService()