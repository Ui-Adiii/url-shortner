import express from "express";
import { createShortUrl } from "../controllers/url.controller";
import { urlCreateValidator } from "../validations/url.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware";

const urlRouter = express.Router();

urlRouter.post("/", urlCreateValidator,authMiddleware, createShortUrl);

export default urlRouter;
