import User from "../models/User.js";
import { logError } from "../util/logging.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "User doesn't exist. Please sign up" });
    }
    // Compare provided password with the hashed password in the database

    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Incorrect password" });
    }

    // Create JWT token

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.status(200).json({ success: true, token });
  } catch (err) {
    logError("Server error", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};
