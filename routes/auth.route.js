import express from "express";
import { body } from "express-validator";

import {
  registerController,
  loginController,
  userController,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// user register
router.post(
  "/signup",
  [
    body("email", "Enter a valid email").trim().isEmail().normalizeEmail(),
    body("name", "Name is required")
      .notEmpty()
      .custom((name) => {
        var expression = /^\S+$/g;
        var regex = new RegExp(expression);
        if (name.match(regex)) {
          return true;
        } else {
          throw new Error(
            'Usernames may only contain letters, numbers, underscores ("_") and periods (".")'
          );
        }
      }),
    body("password", "Must be atleast 8 character").isLength({
      min: 8,
    }),
    body("age", "Age is Required").notEmpty(),
  ],
  registerController
);

// user login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").trim().isEmail().normalizeEmail(),
    body("password", "Enter Valid Password").isLength({ min: 8 }),
  ],
  loginController
);

// user detail
router.get("/user", authMiddleware, userController);

export default router;
