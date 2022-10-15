export enum ValidationMessages {
  Required = "To pole jest wymagane!",
  PasswordMatch = "Hasła muszą być takie same!",
  PasswordPattern = "Hasło powinno zawierać min. 8 znaków, małą i dużą literę, cyfrę oraz znak specjalny (!@*$&)",
  NameTaken = "Podana nazwa jest już zajęta",
  NumbersOnly = "To pole może zawierać jedynie cyfry!",
  OnlyAlphanumeric = "To pole nie może zawierać znaków specjalnych!",
  Emergency = "Numer wewnętrzny nie może zaczynać się od 99, 98 lub 112.",
  WrongEmail = "Błędny adres email",
}

export const validationPatterns = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  onlyNumbers: /^\d+$/,
  onlyAlphanumeric: /^[a-z0-9]+$/i,
  onlyAlphanumericWithSpace: /^[a-z0-9 ]+$/i,
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

export const alphanumericValidator = {
  value: validationPatterns.onlyAlphanumeric,
  message: ValidationMessages.OnlyAlphanumeric,
};
export const sipAccNameValidator = {
  value: validationPatterns.onlyAlphanumericWithSpace,
  message: ValidationMessages.OnlyAlphanumeric,
};
export const emailValidator = {
  value: validationPatterns.email,
  message: ValidationMessages.WrongEmail,
};

export const minLengthValidator = (minLength: number) => ({
  value: minLength,
  message: `To pole musi zawierać min. ${minLength} znaków!`,
});

export const maxLengthValidator = (maxLength: number) => ({
  value: maxLength,
  message: `To pole może zawierać max. ${maxLength} znaków!`,
});

export const minValueValidator = (value: string, minValue: number) => {
  if (value === "") return undefined;
  return minValue > +value
    ? `Minimalna wartość dla tego pola to ${minValue}!`
    : undefined;
};

export const maxValueValidator = (value: string, maxValue: number) => {
  if (value === "") return undefined;
  return maxValue < +value
    ? `Maksymalna wartość dla tego pola to ${maxValue}!`
    : undefined;
};

export const checkIfEmpty = (value: string) =>
  !!value.trim() || ValidationMessages.Required;

export const checkIfMultiselectEmpty = (value: any[]) =>
  value.length > 0 || ValidationMessages.Required;

export const checkIfEmergency = (value: string) => {
  return (
    (!value.startsWith("99") &&
      !value.startsWith("98") &&
      !value.startsWith("112")) ||
    ValidationMessages.Emergency
  );
};

export const checkPasswordMatch = (value: string, passwordToMatch: string) =>
  value === passwordToMatch ? undefined : ValidationMessages.PasswordMatch;

const workNumberValidate = (v: string) => {
  if (v.length > 3 && v.length < 9)
    return "To pole musi zawierać min. 9 znaków!";
  if (v.length > 15) return "To pole musi zawierać max. 15 znaków!";
  return undefined;
};
export const workNumberRules = {
  validate: workNumberValidate,
};
