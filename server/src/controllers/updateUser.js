import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { logError } from "../util/logging.js";
import { createOrUpdateSendbirdUser } from "./addUserToSendBird.js";

export const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, msg: "User ID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, msg: "Invalid User ID" });
  }
  const { user } = req.body;
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ success: false, msg: "Token is required" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    res.status(401).json({ success: false, msg: "Invalid token" });
    return;
  }

  if (!id) {
    res.status(400).json({ success: false, msg: "User ID is required" });
    return;
  }

  if (typeof user !== "object") {
    res.status(400).json({
      success: false,
      msg: `You need to provide a 'user' object. Received: ${JSON.stringify(user)}`,
    });
    return;
  }

  const updatedUser = await User.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
    select: "-password",
  });

  try {
    await createOrUpdateSendbirdUser(updatedUser);
  } catch (error) {
    logError(error);
  }
  if (!updatedUser) {
    logError("User not found");
    res.status(404).json({ success: false, msg: "User not found" });
    return;
  }

  res.status(200).json({ success: true, updatedUser });
};
