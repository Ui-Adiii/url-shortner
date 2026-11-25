import { body } from "express-validator";

export const urlCreateValidator = [
  body("fullUrl")
    .trim()
    .notEmpty()
    .withMessage("Full url is required"),
];
