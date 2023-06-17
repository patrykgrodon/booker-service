import { render, screen, userEvent } from "tests/test-utils";
import { vi } from "vitest";
import CloseButton from "./CloseButton";

describe("<CloseButton />", () => {
  const onClickMock = vi.fn();
  beforeEach(() => {
    render(<CloseButton onClick={onClickMock} />);
  });

  it("should render correctly", () => {
    expect(screen.getByRole("button", { name: /Close/ }));
  });

  it("should call passed onClick fn when click on button", async () => {
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalled();
  });
});
