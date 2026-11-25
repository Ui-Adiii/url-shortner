import urlService from "../services/url.service";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

export const createShortUrl = asyncHandler(async (req, res) => {
  const { fullUrl} = req.body;
  const userId = req.userId;
  if(!userId){
    throw new AppError("unauthorized", 401);
  }
  const shortUrl = await urlService.createShortUrl({fullUrl,userId});

  return res.status(201).json({
    message:"url created successfully",
    shortUrl
  });

});


export const redirectFromShortUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const url = await urlService.getUrlById(id as string);
  if (!url) throw new Error("Short URL not found");
  res.redirect(url.fullUrl);
});