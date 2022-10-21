import { CustomerFormValues, SellerFormValues, UserType } from "common/types";

export interface LoginFormValues {
  email: string;
  password: string;
}

export type CreateUser = <T extends UserType>(
  type: T,
  formValues: T extends "customer"
    ? Omit<CustomerFormValues, "confirmPassword">
    : Omit<SellerFormValues, "confirmPassword">
) => Promise<void>;

export type Login = (loginFormValues: LoginFormValues) => Promise<void>;
