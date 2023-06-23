import { User } from "common/types";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type RegisterFormValues = Omit<User, "id"> & {
  password: string;
  confirmPassword: string;
};

export type Login = (formValues: LoginFormValues) => Promise<void>;
export type Register = (formValues: RegisterFormValues) => Promise<void>;

export type UserDocValues = Omit<
  RegisterFormValues,
  "password" | "confirmPassword"
>;
