import { render, screen, userEvent } from "tests/test-utils";
import ControlSelect from "./ControlSelect";

describe("<ControlSelect />", () => {
  const menuItemValue = "Test";
  const selectProps = {
    id: "label",
    label: "label",
  };
  beforeEach(() => {
    render(
      <ControlSelect
        data-testid="select"
        id={selectProps.id}
        label={selectProps.label}
        defaultValue=""
        options={[{ label: menuItemValue, value: menuItemValue }]}
      />
    );
  });

  it("should render correctly select", () => {
    const label = screen.getByLabelText(selectProps.label);
    const inputBox = screen.getByTestId("select");

    expect(label).toBeInTheDocument();
    expect(inputBox).toBeInTheDocument();
  });

  it("should open item list", async () => {
    const openListBtn = screen.getByRole("button");

    await userEvent.click(openListBtn);
    const menuItem = screen.getByRole("option", { name: menuItemValue });

    expect(menuItem).toBeInTheDocument();
  });
  it("should change value of select when choose option", async () => {
    const openListBtn = screen.getByRole("button");
    const input = screen.getByTestId("select").querySelector("input");

    expect(input?.value).toEqual("");

    await userEvent.click(openListBtn);

    const menuItem = screen.getByRole("option", { name: menuItemValue });

    await userEvent.click(menuItem);

    expect(input?.value).toEqual(menuItemValue);
  });
});
