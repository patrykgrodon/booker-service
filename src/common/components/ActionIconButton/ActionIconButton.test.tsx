import { EditOutlined } from "@mui/icons-material";
import { render, screen } from "@testing-library/react";
import ActionIconButton from "./ActionIconButton";
import MuiThemeProviders from "common/providers/MuiThemeProviders";

describe("<ActionIconButton />", () => {
  const props = {
    enabled: true,
    icon: EditOutlined,
    tooltip: "Edit",
    withBadge: false,
    isLoading: false,
  };
  it("should render as enabled", () => {
    render(
      <MuiThemeProviders>
        <ActionIconButton {...props} />
      </MuiThemeProviders>
    );

    const button = screen.getByRole("button", {
      name: props.tooltip,
    });

    expect(button).toBeEnabled();
  });

  it("should render as disabled", () => {
    render(
      <MuiThemeProviders>
        <ActionIconButton {...props} enabled={false} />
      </MuiThemeProviders>
    );

    const button = screen.getByRole("button", {
      name: props.tooltip,
    });

    expect(button).toBeDisabled();
  });

  it("should render as loading", () => {
    render(
      <MuiThemeProviders>
        <ActionIconButton {...props} isLoading />
      </MuiThemeProviders>
    );

    const button = screen.getByRole("button", {
      name: props.tooltip,
    });
    const spinner = screen.getByRole("progressbar");

    expect(button).toBeDisabled();
    expect(spinner).toBeInTheDocument();
  });

  it("should render with badge", () => {
    render(
      <MuiThemeProviders>
        <ActionIconButton {...props} withBadge />
      </MuiThemeProviders>
    );

    const badge = screen.getByTestId(/badge/);

    expect(badge).toBeInTheDocument();
  });

  it("should render without badge", () => {
    render(
      <MuiThemeProviders>
        <ActionIconButton {...props} />
      </MuiThemeProviders>
    );

    const badge = screen.queryByTestId(/badge/);

    expect(badge).toBeNull();
  });

  it("should render icon", () => {
    render(
      <MuiThemeProviders>
        <ActionIconButton {...props} />
      </MuiThemeProviders>
    );

    const icon = screen.getByTestId(/EditOutlined/);

    expect(icon).toBeInTheDocument();
  });

  it("should render tooltip", () => {
    render(
      <MuiThemeProviders>
        <ActionIconButton {...props} />
      </MuiThemeProviders>
    );

    const tooltip = screen.getByLabelText(props.tooltip, {
      selector: "span",
    });

    expect(tooltip).toBeInTheDocument();
  });
});
