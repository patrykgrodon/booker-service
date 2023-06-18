import { render, screen, userEvent } from "tests/test-utils";
import PasswordField from "./PasswordField";

describe.only("<PasswordField />", () => {
  const props = {
    label: "Password",
    name: "password",
    id: "password",
  };

  beforeEach(() => {
    render(<PasswordField {...props} />);
  });

  it("should render with correct props", () => {
    const input = screen.getByLabelText(props.label);
    expect(input).toBeInTheDocument();
  });

  it("should change input type on icon click", async () => {
    const passwordField = screen.getByLabelText(props.label);
    const visibilityButton = screen.getByRole("button", {
      name: /Show password/,
    });

    await userEvent.click(visibilityButton);
    expect(passwordField).toHaveAttribute("type", "text");
    expect(visibilityButton).toHaveAttribute("aria-label", "Hide password");

    await userEvent.click(visibilityButton);
    const textPasswordField = screen.getByLabelText(props.label);
    expect(textPasswordField).toHaveAttribute("type", "password");
  });
});
