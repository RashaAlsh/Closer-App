import dotenv from "dotenv";
dotenv.config();
import { logError } from "../util/logging.js";

const SENDBIRD_API_TOKEN = process.env.REACT_APP_SENDBIRD_ACCESS_TOKEN;
const SENDBIRD_APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;

export const createOrUpdateSendbirdUser = async (user) => {
  const url = `https://api-${SENDBIRD_APP_ID}.sendbird.com/v3/users`;
  const headers = {
    "Content-Type": "application/json, charset=utf8",
    "Api-Token": SENDBIRD_API_TOKEN,
  };
  const data = {
    user_id: user._id.toString(),
    nickname: user.firstName,
    profile_url: user.profilePicture,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    logError(error);
  }
};
