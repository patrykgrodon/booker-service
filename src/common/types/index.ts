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

type CustomerAccInfo = Omit<CustomerFormValues, "confirmPassword">;
type SellerAccInfo = Omit<SellerFormValues, "confirmPassword">;

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
