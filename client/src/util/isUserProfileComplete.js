import { userSchema } from "../hooks/schemas/userSchema";

export const isUserProfileComplete = (user) => {
  if (typeof user !== "object" || user === null) {
    return false;
  }
  try {
    const schema = userSchema();
    // Validate user object against the schema
    schema.validateSync(user, { abortEarly: false });
    return true;
  } catch (e) {
    return false;
  }
};
