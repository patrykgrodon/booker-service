import { sendPasswordResetEmail } from "firebase/auth";
import { render, screen, userEvent } from "tests/test-utils";
import { vi } from "vitest";
import ForgotPasswordForm from "./ForgotPasswordForm";

vi.mock("firebase/auth", async () => {
  const actual = (await vi.importActual("firebase/auth")) as any;

  return {
    ...actual,

    sendPasswordResetEmail: vi.fn(),
  };
});

describe("<ForgotPasswordForm />", () => {
  const emailFieldLabel = "E-mail";
  const submitBtnText = "Send";
  const succeessText = /Email has been successfully sent!/;

  beforeEach(() => {
    render(<ForgotPasswordForm />);
  });

  it("should render form correctly", () => {
    expect(screen.getByLabelText(emailFieldLabel)).toBeInTheDocument();
    expect(screen.queryByText(succeessText)).not.toBeInTheDocument();
  });
  it("should send reset password email on submit form", async () => {
    const userEmail = "test@gmail.com";

    const emailField = screen.getByLabelText(emailFieldLabel);
    const submitBtn = screen.getByRole("button", { name: submitBtnText });

    await userEvent.type(emailField, userEmail);
    await userEvent.click(submitBtn);

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      expect.objectContaining({}),
      userEmail,
      expect.objectContaining({})
    );
    expect(screen.getByText(succeessText)).toBeInTheDocument();
  });
});
