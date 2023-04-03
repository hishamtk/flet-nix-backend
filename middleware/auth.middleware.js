import jwt from "jsonwebtoken";
import keys from "../config/keys.js";
import User from "../model/User.model.js";

let authMiddleware = (req, res, next) => {
  let token = req.header("Authorization");
  if (token.startsWith("Bearer ")) {
    token = token.substring(7, token.length);
  } else {
    return res.status(403).json({ info: "Auth Denied", type: "error" });
  }
  if (!token) {
    return res.status(403).json({ info: "Auth Denied", type: "error" });
  }
  jwt.verify(token, keys.jwtPrivate, async (error, decoded) => {
    if (error) {
      return res.status(403).json({ info: "Unauthorized", type: "error" });
    } else {
      // check whether user is flagged
      let user = await User.findOne({ _id: decoded.id });
      if (user?.isflagged) {
        return res.status(403).json({ info: "Unautherized", type: "error" });
      }
      req.userId = decoded.id;
      req.user = user;

      next();
    }
  });
};

export default authMiddleware;
