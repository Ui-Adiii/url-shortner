import urlService from "../services/url.service.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createShortUrl = asyncHandler(async (req, res) => {
  const { fullUrl } = req.body;
  const userId = req.userId;
  if (!userId) {
    throw new AppError("unauthorized", 401);
  }
  const shortUrl = await urlService.createShortUrl({ fullUrl, userId });

  return res.status(201).json({
    message: "url created successfully",
    shortUrl,
  });
});

export const redirectFromShortUrl = asyncHandler(async (req, res) => {
  const { short } = req.params;
  const url = await urlService.getUrlById(short as string);
  if (!url) throw new Error("Short URL not found");
  res.redirect(url.fullUrl);
});

export const getAllShortUrl = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const order: "asc" | "desc" = req.query.order === "desc" ? "desc" : "asc";
  const userId = req.userId;
  if (!userId) {
    throw new AppError("unauthorized", 401);
  }
  const urls = await urlService.getAllShortUrls(userId, page, limit, order);
  if (!urls) {
    throw new AppError("no urls found", 404);
  }
  return res.status(200).json({
    urls,
    message: "urls fetched successfully",
  });
});
