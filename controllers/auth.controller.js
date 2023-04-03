// packages
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import keys from "../config/keys.js";
import User from "../model/User.model.js";

const saltRounds = 10;

/*
error msg in register and login should be in [ { msg: erro}]
format as we are getting error from validator as array.
*/

// registration controller

let registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ info: errors.array(), type: "error" });
  }
  try {
    let { name, email, password , age } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        info: [{ msg: "Email address already existed" }],
        type: "error",
      });
    }
    let checkName = await User.findOne({ name });
    if (checkName) {
      return res
        .status(404)
        .json({ info: [{ msg: "Username already taken" }], type: "error" });
    }
    password = await bcrypt.hash(password, saltRounds);
    let createdOn = new Date();
    user = new User({ name, email, password ,age, createdOn });
    await user.save();

   

    res.status(200).json({
      info: "Registration completed  successfully",
      type: "data",
    });
  } catch (error) {
    res.status(500).json({ info: "Internal server error", type: "error" });
    console.log(error);
  }
};
// login controller
let loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ info: errors.array(), type: "error" });
  }
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        info: [{ msg: "Incorrect username or password." }],
        type: "error",
      });
    }
  if (user.isflagged) {
      return res
        .status(403)
        .json({ info: [{ msg: "Banned user contact Admin" }], type: "error" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        info: [{ msg: "Incorrect username or password." }],
        type: "error",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      keys.jwtPrivate,
      { expiresIn: "2 days" }
    );
    let lastLogin = new Date();
    let loginUpdate = await User.findByIdAndUpdate(user._id, lastLogin);
    return res.status(200).json({
      info: "Auth Success / Token Issued",
      token,
      type: "data",
    });
  } catch (error) {
    res.status(500).json({ info: "Internal server error", type: "error" });
    console.log(error);
  }
};



// get user data
let userController = async (req, res) => {
  try {
    let { userId } = req;
    let user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(403).json({ info: "Auth error", type: "error" });
    }

    res.status(200).json({ info: user, type: "data" });
  } catch (error) {
    res.status(500).json({ info: "internal Server error", type: "error" });
    console.log(error);
  }
};

export {
  registerController,
  loginController,
  userController,
};
