import {
  CustomerFormValues,
  CustomerUserInfo,
  ServiceProviderFormValues,
  ServiceProviderUserInfo,
  UserType,
} from "common/types";

export interface LoginFormValues {
  email: string;
  password: string;
}

export type CreateUser = <T extends UserType>(
  type: T,
  formValues: T extends "customer"
    ? Omit<CustomerFormValues, "confirmPassword">
    : Omit<ServiceProviderFormValues, "confirmPassword">
) => Promise<void>;

export type EditUser = <T extends UserType>(
  uuid: string,
  type: T,
  values: Partial<
    T extends "customer" ? CustomerUserInfo : ServiceProviderUserInfo
  >
) => Promise<void>;

export type Login = (loginFormValues: LoginFormValues) => Promise<void>;
