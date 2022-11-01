import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordField from "./PasswordField";

describe("<PasswordField />", () => {
  const props = {
    label: "Hasło",
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
      name: /Włącz podgląd/,
    });

    await act(async () => userEvent.click(visibilityButton));
    expect(passwordField).toHaveAttribute("type", "text");
    expect(visibilityButton).toHaveAttribute(
      "aria-label",
      "Wyłącz podgląd hasła"
    );

    await act(async () => userEvent.click(visibilityButton));
    const textPasswordField = screen.getByLabelText(props.label);
    expect(textPasswordField).toHaveAttribute("type", "password");
  });
});
