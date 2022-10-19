import { Service } from "modules/services/types";

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

export type AccountType = "customer" | "seller";

export type CustomerAccInfo = Omit<CustomerFormValues, "confirmPassword">;
export type SellerAccInfo = Omit<SellerFormValues, "confirmPassword"> & {
  services: Service[];
};

export type Account = { uuid: string } & (
  | ({
      type: "customer";
    } & CustomerAccInfo)
  | ({
      type: "seller";
    } & SellerAccInfo)
);

export type CreateCustomerAcc = (values: CustomerFormValues) => Promise<void>;
export type CreateSellerAcc = (values: SellerFormValues) => Promise<void>;

export type EditAccount = <T extends AccountType>(
  uuid: string,
  type: T,
  values: Partial<T extends "customer" ? CustomerAccInfo : SellerAccInfo>
) => Promise<void>;
