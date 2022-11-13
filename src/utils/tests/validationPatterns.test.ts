import {
  checkPasswordMatch,
  checkIfEmpty,
  ValidationMessages,
  validationPatterns,
  checkIfMultiselectEmpty,
} from "utils/validationPatterns";

describe("checkPasswordMatch", () => {
  it("should return undefined if passwords are exact", () => {
    const password1 = "password";
    const password2 = "password";
    const result = checkPasswordMatch(password1, password2);

    expect(result).toBe(undefined);
  });

  it("should return PasswordMatch validation message if passwords don't match", () => {
    const password1 = "password";
    const password2 = "different-password";
    const result = checkPasswordMatch(password1, password2);

    expect(result).toBe(ValidationMessages.PasswordMatch);
  });
});

describe("checkIfEmpty", () => {
  it("should return true if value contains character", () => {
    const value = "    s";
    const result = checkIfEmpty(value);
    expect(result).toBeTruthy();

    const value2 = " s    a   ";
    const result2 = checkIfEmpty(value2);
    expect(result2).toBeTruthy();
  });

  it("should return Required validation message if value contains only whitespace", () => {
    const value = "   ";
    const result = checkIfEmpty(value);

    expect(result).toBe(ValidationMessages.Required);

    const value2 = "";
    const result2 = checkIfEmpty(value2);
    expect(result2).toBe(ValidationMessages.Required);
  });
});

describe("checkIfMultiselectEmpty", () => {
  it("should return true if value contains element", () => {
    const value = ["el1"];
    const result = checkIfMultiselectEmpty(value);
    expect(result).toBeTruthy();

    const value2 = ["el1", "el2"];
    const result2 = checkIfMultiselectEmpty(value2);
    expect(result2).toBeTruthy();
  });

  it("should return Required validation message if value doesn't contain any element", () => {
    const value: [] = [];
    const result = checkIfMultiselectEmpty(value);

    expect(result).toBe(ValidationMessages.Required);
  });
});

describe("password validation pattern", () => {
  it("should return true if password complies with pattern", () => {
    const correctPasswords = ["Abcde12!", "pa$$Word123", "teSt0&%$@!"];

    correctPasswords.forEach((password) => {
      expect(validationPatterns.password.test(password)).toBeTruthy();
    });
  });

  it("should return false if password doesn't comply with pattern", () => {
    const incorrectPasswords = [
      "Abc123",
      "Ab1!",
      "aaaaaaaa",
      "Test123",
      "A!@212CC",
      "@$!%*?&",
    ];

    incorrectPasswords.forEach((password) => {
      expect(validationPatterns.password.test(password)).toBeFalsy();
    });
  });
});

describe("only numbers validation pattern", () => {
  it("should return true if value contain only numbers", () => {
    const correctValues = ["1", "2321", "57", "82"];
    correctValues.forEach((value) => {
      expect(validationPatterns.onlyNumbers.test(value)).toBeTruthy();
    });
  });
  it("should return false if value doesn't contain only numbers", () => {
    const incorrectValues = ["d1", "222c", "938o"];
    incorrectValues.forEach((value) =>
      expect(validationPatterns.onlyNumbers.test(value)).toBeFalsy()
    );
  });
});
