export enum ValidationMessages {
  Required = "This field is required!",
  PasswordMatch = "Passwords must be same!",
  PasswordPattern = "The password should contain min. 8 characters, lowercase and uppercase letter, number and special character (@$!%*?&)",
  NumbersOnly = "This field can contain only numbers!",
  WrongEmail = "Wrong email!",
}

export const validationPatterns = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  onlyNumbers: /^\d+$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};

export const passwordPatternValidator = {
  value: validationPatterns.password,
  message: ValidationMessages.PasswordPattern,
};

export const onlyNumbersValidator = {
  value: validationPatterns.onlyNumbers,
  message: ValidationMessages.NumbersOnly,
};

export const emailValidator = {
  value: validationPatterns.email,
  message: ValidationMessages.WrongEmail,
};

export const minLengthValidator = (minLength: number) => ({
  value: minLength,
  message: `This password should contain min. ${minLength} characters!`,
});

export const maxLengthValidator = (maxLength: number) => ({
  value: maxLength,
  message: `This field should contain max. ${maxLength} characters!`,
});

export const minValueValidator = (value: string, minValue: number) => {
  if (value === "") return undefined;
  return minValue > +value
    ? `Minimum value for this field is ${minValue}!`
    : undefined;
};

export const maxValueValidator = (value: string, maxValue: number) => {
  if (value === "") return undefined;
  return maxValue < +value
    ? `Maximum value for this field is ${maxValue}!`
    : undefined;
};

export const checkIfEmpty = (value: string) =>
  !!value.trim() || ValidationMessages.Required;

export const checkIfMultiselectEmpty = (value: any[]) =>
  value.length > 0 || ValidationMessages.Required;

export const checkPasswordMatch = (value: string, passwordToMatch: string) =>
  value === passwordToMatch ? undefined : ValidationMessages.PasswordMatch;
