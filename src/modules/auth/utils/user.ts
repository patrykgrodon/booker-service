import { User } from "common/types";

export const getUserName = (user: User | null) => {
  if (!user) return "No data";
  if (user.type === "customer") return `${user.firstName} ${user.lastName}`;
  return user.companyName;
};

export const getUserType = (user: User | null) => {
  if (!user) return "No data";

  return user.type === "customer" ? "Customer" : "Service seller";
};
