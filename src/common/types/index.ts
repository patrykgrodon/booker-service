export interface CustomerFormValues {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface ServiceProviderFormValues {
  email: string;
  companyName: string;
  phoneNumber: string;
  city: string;
  street: string;
  streetNumber: string;
  password: string;
  confirmPassword: string;
}

export type UserType = "customer" | "serviceProvider";

export type CustomerUserInfo = Omit<CustomerFormValues, "confirmPassword">;
export type ServiceProviderUserInfo = Omit<
  ServiceProviderFormValues,
  "confirmPassword"
>;

export type User = { id: string } & (
  | ({
      type: "customer";
    } & CustomerUserInfo)
  | ({
      type: "serviceProvider";
    } & ServiceProviderUserInfo)
);
