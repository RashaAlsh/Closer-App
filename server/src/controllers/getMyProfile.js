import mongoose from "mongoose";
import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const getMyProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, msg: "invalid user ID" });
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ success: false, msg: "User not found" });
      return;
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get user, try again later" });
  }
};
