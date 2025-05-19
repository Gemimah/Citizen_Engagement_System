import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { AppError } from "./errorHandler";

export const validateComplaint = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),

  body("description")
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage("Description must be between 20 and 1000 characters"),

  body("category")
    .optional()
    .trim()
    .isIn([
      "Road Maintenance",
      "Public Transport",
      "Waste Management",
      "Other",
      "Auto-detect (NLP)",
    ])
    .withMessage("Invalid category"),

  body("userEmail")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email address"),

  body("userPhone")
    .optional()
    .trim()
    .matches(/^\+?[\d\s-]{10,}$/)
    .withMessage("Invalid phone number"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      return next(new AppError(errorMessages.join(", "), 400));
    }
    next();
  },
];
