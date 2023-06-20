import { setDoc } from "@firebase/firestore";
import { validationMessages } from "common/utils/validationPatterns";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { render, screen, userEvent } from "tests/test-utils";
import { vi } from "vitest";
import RegisterForm from "./RegisterForm";

vi.mock("firebase/auth", async () => {
  const actual = (await vi.importActual("firebase/auth")) as any;

  return {
    ...actual,
    createUserWithEmailAndPassword: vi
      .fn()
      .mockResolvedValue(Promise.resolve({ user: { uid: "mock-user-id" } })),
  };
});

vi.mock("@firebase/firestore", async () => {
  const actual = (await vi.importActual("@firebase/firestore")) as any;

  return {
    ...actual,
    setDoc: vi.fn().mockResolvedValue(Promise.resolve()),
  };
});

describe("<RegisterForm />", () => {
  const submitText = /Sign up/;
  const requiredMessage = validationMessages.required;
  const fields = {
    companyName: { label: "Company name", value: "test company name" },
    email: { label: "E-mail", value: "test@gmail.com" },
    phoneNumber: { label: "Phone number", value: "123321123" },
    city: { label: "City", value: "test city" },
    street: { label: "Street", value: "test street" },
    streetNumber: { label: "Street number", value: "test street number" },
    password: { label: "Password", value: "Password123!" },
    confirmPassword: { label: "Confirm password", value: "" },
  };

  beforeEach(() => {
    render(<RegisterForm />);
  });

  it("should render form with all inputs", () => {
    Object.values(fields).forEach(({ label }) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it("should display error messages on empty fields", async () => {
    const submitButton = screen.getByRole("button", { name: submitText });

    await userEvent.click(submitButton);

    const errorMessages = screen.getAllByText(requiredMessage);
    expect(errorMessages).toHaveLength(Object.keys(fields).length);
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
    expect(setDoc).not.toHaveBeenCalled();
  });

  it("should call API on success submit", async () => {
    const submitButton = screen.getByRole("button", { name: submitText });

    const companyNameField = screen.getByLabelText(fields.companyName.label);
    const emailField = screen.getByLabelText(fields.email.label);
    const phoneNumberField = screen.getByLabelText(fields.phoneNumber.label);
    const cityField = screen.getByLabelText(fields.city.label);
    const streetField = screen.getByLabelText(fields.street.label);
    const streetNumberField = screen.getByLabelText(fields.streetNumber.label);
    const passwordField = screen.getByLabelText(fields.password.label);
    const confirmPasswordField = screen.getByLabelText(
      fields.confirmPassword.label
    );

    await userEvent.type(companyNameField, fields.companyName.value);
    await userEvent.type(emailField, fields.email.value);
    await userEvent.type(phoneNumberField, fields.phoneNumber.value);
    await userEvent.type(cityField, fields.city.value);
    await userEvent.type(streetField, fields.street.value);
    await userEvent.type(streetNumberField, fields.streetNumber.value);
    await userEvent.type(passwordField, fields.password.value);
    await userEvent.type(confirmPasswordField, fields.password.value);

    await userEvent.click(submitButton);

    const errorMessages = screen.queryAllByText(requiredMessage);
    expect(errorMessages).toHaveLength(0);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.objectContaining({}),
      fields.email.value,
      fields.password.value
    );
    expect(setDoc).toHaveBeenCalledWith(
      expect.objectContaining({}),
      expect.objectContaining({
        companyName: fields.companyName.value,
        email: fields.email.value,
        phoneNumber: fields.phoneNumber.value,
        city: fields.city.value,
        street: fields.phoneNumber.value,
        streetNumber: fields.streetNumber.value,
      })
    );
  });
});
