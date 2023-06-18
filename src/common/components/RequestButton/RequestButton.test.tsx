import { render, screen } from "tests/test-utils";
import RequestButton from "./RequestButton";

describe("<RequestButton />", () => {
  const buttonText = "Add";

  it("should render passed in children", () => {
    render(<RequestButton>{buttonText}</RequestButton>);
    const button = screen.getByRole("button", { name: buttonText });

    expect(button).toBeInTheDocument();
  });

  it("should render loading spinner when isLoading prop is true", () => {
    render(<RequestButton isLoading={true}>{buttonText}</RequestButton>);
    const buttonWithText = screen.queryByRole("button", { name: buttonText });

    expect(buttonWithText).not.toBeInTheDocument();

    const button = screen.getByRole("button");
    const spinner = screen.getByRole("progressbar");

    expect(spinner).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");
  });
});
