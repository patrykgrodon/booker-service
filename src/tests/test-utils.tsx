import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MuiThemeProviders } from "common/providers";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <MuiThemeProviders>{children}</MuiThemeProviders>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render, userEvent };
