export type LoginFormValues = {
  email: string;
  password: string;
};

export type Login = (formValues: LoginFormValues) => Promise<void>;
