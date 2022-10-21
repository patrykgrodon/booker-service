export interface CustomerFormValues {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface SellerFormValues {
  email: string;
  companyName: string;
  phoneNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export type UserType = "customer" | "seller";

export type CustomerUserInfo = Omit<CustomerFormValues, "confirmPassword">;
export type SellerUserInfo = Omit<SellerFormValues, "confirmPassword">;

export type User = { id: string } & (
  | ({
      type: "customer";
    } & CustomerUserInfo)
  | ({
      type: "seller";
    } & SellerUserInfo)
);

export type CreateCustomerUser = (values: CustomerFormValues) => Promise<void>;
export type CreateSellerUser = (values: SellerFormValues) => Promise<void>;

export type EditUser = <T extends UserType>(
  uuid: string,
  type: T,
  values: Partial<T extends "customer" ? CustomerUserInfo : SellerUserInfo>
) => Promise<void>;
