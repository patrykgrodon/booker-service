export type LoginFormValues = {
  email: string;
  password: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type Login = (formValues: LoginFormValues) => Promise<void>;
