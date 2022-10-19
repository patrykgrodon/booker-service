import { MenuItem } from "@mui/material";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiThemeProviders from "common/providers/MuiThemeProviders";
import ControlSelect from "./ControlSelect";

describe("<ControlSelect />", () => {
  const menuItemValue = "Test";
  const props = {
    id: "label",
    label: "label",
  };
  beforeEach(() => {
    render(
      <MuiThemeProviders>
        <ControlSelect
          data-testid="select"
          id={props.id}
          label={props.label}
          defaultValue="">
          <MenuItem data-testid="menuItem" value={menuItemValue}>
            {menuItemValue}
          </MenuItem>
        </ControlSelect>
      </MuiThemeProviders>
    );
  });

  it("should render correctly select", () => {
    const label = screen.getByLabelText(props.label);
    const inputBox = screen.getByTestId("select");

    expect(label).toBeInTheDocument();
    expect(inputBox).toBeInTheDocument();
  });

  it("should open item list", async () => {
    const openListBtn = screen.getByRole("button");

    await act(async () => userEvent.click(openListBtn));
    const menuItem = screen.getByTestId("menuItem");

    expect(menuItem).toBeInTheDocument();
  });
  it("should change value of select on item click", async () => {
    const openListBtn = screen.getByRole("button");
    const input = screen.getByTestId("select").querySelector("input");

    expect(input?.value).toEqual("");

    await act(async () => userEvent.click(openListBtn));

    const menuItem = screen.getByTestId("menuItem");

    await act(async () => userEvent.click(menuItem));

    expect(input?.value).toEqual(menuItemValue);
  });
});
