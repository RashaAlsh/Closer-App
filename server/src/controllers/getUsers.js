import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const getUsers = async (req, res) => {
  try {
    const filters = req.query.filters;

    const parsedFilters = filters ? JSON.parse(filters) : [];

    const query = {};

    if (parsedFilters.length > 0) {
      query.$or = parsedFilters.map((filter) => ({
        $or: [
          { hobbies: filter },
          { location: { $elemMatch: { city: filter } } },
        ],
      }));
    }

    const users = await User.find(query).select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to fetch users, try again later",
    });
  }
};
