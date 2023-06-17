import { render, screen, userEvent } from "tests/test-utils";

import ConfirmationDialog from "./ConfirmationDialog";
import { vi } from "vitest";

describe("<ConfirmationDialog /> as success", () => {
  const props = {
    type: "success" as const,
    open: true,
    title: "Success!",
    mainButtonText: "Ok",
    handleClose: vi.fn(),
    handleClick: vi.fn(),
  };

  it("should render dialog with passed in texts", async () => {
    render(<ConfirmationDialog {...props} />);

    const dialogTitle = await screen.findByRole("heading", {
      name: props.title,
    });
    const actionButton = await screen.findByRole("button", {
      name: props.mainButtonText,
    });
    const closeIconButton = screen.getByRole("button", { name: /Close/ });

    expect(dialogTitle).toBeInTheDocument();
    expect(actionButton).toBeInTheDocument();
    expect(closeIconButton).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("should render only one action button when oneAction prop is true", async () => {
    render(<ConfirmationDialog {...props} oneAction />);

    const actionButton = await screen.findByRole("button", {
      name: props.mainButtonText,
    });
    const buttons = await screen.findAllByRole("button");

    expect(actionButton).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });
});

describe("<ConfirmationDialog /> as error", () => {
  const props = {
    type: "error" as const,
    open: true,
    title: "Error!",
    mainButtonText: "Ok",
    handleClose: vi.fn(),
    handleClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    render(<ConfirmationDialog {...props} />);
  });

  it("should call main action on primary button click", async () => {
    const actionButton = screen.getByRole("button", {
      name: props.mainButtonText,
    });

    await userEvent.click(actionButton);

    expect(props.handleClick).toBeCalledTimes(1);
  });

  it("should close dialog on secondary button click", async () => {
    const secondaryButton = screen.getByRole("button", {
      name: /secondary/,
    });

    await userEvent.click(secondaryButton);

    expect(props.handleClose).toBeCalledTimes(1);
    expect(props.handleClick).not.toBeCalled();
  });

  it("should close dialog on icon button click", async () => {
    const closeIconButton = screen.getByRole("button", { name: /Close/ });

    await userEvent.click(closeIconButton);
    expect(props.handleClose).toBeCalledTimes(1);
    expect(props.handleClick).not.toBeCalled();
  });
});
