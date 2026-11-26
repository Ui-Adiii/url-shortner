import { body, query } from "express-validator";

export const urlCreateValidator = [
  body("fullUrl")
    .trim()
    .notEmpty()
    .withMessage("Full url is required"),
  query("userId")
    .trim()
    .notEmpty()
    .withMessage("userId is required")
];
