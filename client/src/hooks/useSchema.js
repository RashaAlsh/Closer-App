import { userSchema } from "./schemas/userSchema";

export const useSchema = () => {
  return { user: userSchema() };
};
