import mongoose from "mongoose";
import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const getFriendProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, msg: "Invalid user ID" });
    }

    const user = await User.findById(id).select(
      "_id firstName lastName birthday bio gender profile_picture max_age_preference preferred_gender hobbies",
    );

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({ success: true, friendProfile: user });
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json({ success: false, msg: "Unable to get user, try again later" });
  }
};
