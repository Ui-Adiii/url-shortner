import express from "express";
import { createShortUrl, getAllShortUrl } from "../controllers/url.controller.js";
import { urlCreateValidator } from "../validations/url.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const urlRouter = express.Router();

urlRouter.post("/", urlCreateValidator,authMiddleware, createShortUrl);
urlRouter.get("/", urlCreateValidator,authMiddleware, getAllShortUrl);

export default urlRouter;
