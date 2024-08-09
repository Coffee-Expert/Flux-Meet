import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const verified = jwt.verify(token, "TheSecretKey");

      // Get user from token
      req.user = await User.findById(verified.id).select("-password");
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  if (!token) {
    throw new Error("Access Denied");
    return res.status(403);
  }
};
