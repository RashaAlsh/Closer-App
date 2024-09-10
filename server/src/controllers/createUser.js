import dotenv from "dotenv";
dotenv.config();
import { hash, genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { createOrUpdateSendbirdUser } from "./addUserToSendBird.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET;
// Function that converts the given string id to ObjectId

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(user)}`,
      });
      return;
    }

    const errorList = validateUser(user);
    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
      return;
    }
    // Check if user already exists
    let existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    // Password hashing
    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);

    // Create new user document
    const newUser = new User({
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    // Save the user to MongoDB
    await newUser.save();
    await createOrUpdateSendbirdUser(newUser);

    // Create JWT token synchronously
    if (!JWT_SECRET_KEY) {
      logError("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      {
        _id: newUser._id, // Only include essential data
        username: newUser.username,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    // Return success response with token
    res.status(201).json({ success: true, token });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export { validateUser };
