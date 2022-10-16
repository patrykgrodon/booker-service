import { User } from "../contexts/authContext";

export const getUserName = (user: User | null) => {
  return user ? `${user.firstName} ${user.lastName}` : "No data";
};

export const getUserType = (user: User | null) => {
  if (!user) return "No data";
  return user.userType === "customer" ? "Customer" : "Service seller";
};
