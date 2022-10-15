export const isUserNotAuthorisedError = (error: any) =>
  error?.response?.data?.data?.error === "Unauthorised";

export const isUserBlocked = (error: any) =>
  error?.response?.data?.data?.error === "Blocked user";

export const isPasswordEasyError = (error: any) =>
  error?.response?.data?.data?.password?.find((error: string) =>
    error.includes("data leak")
  );
export const isEmailTaken = (error: any) =>
  error?.response?.data?.data?.email?.find((error: string) =>
    error.includes("taken")
  );

export const isNotEnoughMoney = (error: any) =>
  error.response?.data?.data === "iNSUFFICIENTBALANCE";

export const isPasswordTokenExpired = (error: any) =>
  error.response?.data?.message === "Token does not exist";

export enum ServerErrorMessages {
  General = "Coś poszło nie tak, spróbuj ponownie",
  IncorrectLoginData = "Podany e-mail lub hasło jest błędne",
  EasyPassword = "Podane hasło jest zbyt łatwe",
  PasswordTokenNotExists = "Ten link jest niepoprawny lub stracił już ważność",
  EmailTaken = "Podany adres e-mail jest już zajęty",
  NotEnoughMoney = "Nie masz wystarczająco dużo środków na koncie, żeby dodać nowego użytkownika.",
  UserBlocked = "Twoje konto jest zablokowane",
}
