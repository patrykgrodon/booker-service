import { User } from "common/types";

export const getUserData = async (userId: string) => {
  return { email: userId } as User;
};
