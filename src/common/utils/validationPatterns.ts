export const validationMessages = {
  required: "This field is required!",
  passwordMatch: "Passwords must be the same!",
  passwordPattern:
    "Password should contain at least 8 characters, lower and capital letter, digit and special character (@$!%*?&)",
  numbersOnly: "This field can contain only numbers!",
  wrongEmail: "Wrong address e-mail",
};

export const validationPatterns = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  onlyNumbers: /^\d+$/,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  onlyNumbersAndFloat: /^[+-]?\d+(\.\d+)?$/,
};

export const passwordValidator = {
  value: validationPatterns.password,
  message: validationMessages.passwordPattern,
};

export const onlyNumbersValidator = {
  value: validationPatterns.onlyNumbers,
  message: validationMessages.numbersOnly,
};

export const emailValidator = {
  value: validationPatterns.email,
  message: validationMessages.wrongEmail,
};

export const minLengthValidator = (minLength: number) => ({
  value: minLength,
  message: `This field must contain at least ${minLength} characters!`,
});

export const maxLengthValidator = (maxLength: number) => ({
  value: maxLength,
  message: `This field can contain up to ${maxLength} characters!`,
});

export const minValueValidator = (value: string, minValue: number) => {
  if (value === "") return undefined;
  return minValue > +value
    ? `The minimum value for this field is ${minValue}!`
    : undefined;
};

export const maxValueValidator = (value: string, maxValue: number) => {
  if (value === "") return undefined;
  return maxValue < +value
    ? `The maximum value for this field is ${maxValue}!`
    : undefined;
};

export const checkIfEmpty = (value: string) =>
  !!value.trim() || validationMessages.required;

export const checkIfMultiselectEmpty = (value: any[]) =>
  value.length > 0 || validationMessages.required;

export const checkPasswordMatch = (value: string, passwordToMatch: string) =>
  value === passwordToMatch ? undefined : validationMessages.passwordMatch;
