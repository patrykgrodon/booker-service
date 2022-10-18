import { Account } from "common/types";

export const getUserName = (account: Account | null) => {
  if (!account) return "No data";
  if (account.type === "customer")
    return `${account.firstName} ${account.lastName}`;
  return account.companyName;
};

export const getUserType = (account: Account | null) => {
  if (!account) return "No data";

  return account.type === "customer" ? "Customer" : "Service seller";
};
