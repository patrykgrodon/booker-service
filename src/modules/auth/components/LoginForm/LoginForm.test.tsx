import { validationMessages } from "common/utils/validationPatterns";
import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { render, screen, userEvent } from "tests/test-utils";
import { vi } from "vitest";
import LoginForm from "./LoginForm";

vi.mock("firebase/auth", async () => {
  const actual = (await vi.importActual("firebase/auth")) as any;

  return {
    ...actual,
    signInWithEmailAndPassword: vi
      .fn()
      .mockResolvedValue(Promise.resolve({ user: {} })),
    signInWithRedirect: vi.fn(),
  };
});

describe("<LoginForm />", () => {
  const submitText = "Sign in";
  const requiredMessage = validationMessages.required;
  const fieldLabels = {
    email: "E-mail",
    password: "Password",
  };

  beforeEach(() => {
    render(<LoginForm />);
  });

  it("should render form with all inputs", () => {
    Object.values(fieldLabels).forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it("should display error messages on empty fields", async () => {
    const submitButton = screen.getByRole("button", { name: submitText });

    await userEvent.click(submitButton);

    const errorMessages = screen.getAllByText(requiredMessage);
    expect(errorMessages).toHaveLength(Object.keys(fieldLabels).length);
    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it("should call API on success submit", async () => {
    const submitButton = screen.getByRole("button", { name: submitText });
    const emailField = screen.getByLabelText(fieldLabels.email);
    const passwordField = screen.getByLabelText(fieldLabels.password);

    const userEmail = "test@gmail.com";
    const userPassword = "test";

    await userEvent.type(emailField, userEmail);
    await userEvent.type(passwordField, userPassword);
    await userEvent.click(submitButton);

    const errorMessages = screen.queryAllByText(requiredMessage);
    expect(errorMessages).toHaveLength(0);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.objectContaining({}),
      userEmail,
      userPassword
    );
  });
  it("should call signInWithPopup function when click on sign in with google button", async () => {
    const googleBtn = screen.getByRole("button", {
      name: "Sign in with google",
    });

    await userEvent.click(googleBtn);

    expect(signInWithRedirect).toBeCalled();
  });
});
