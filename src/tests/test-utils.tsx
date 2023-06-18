import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProviders } from "common/providers";
import { BrowserRouter } from "react-router-dom";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProviders>
      <BrowserRouter>{children}</BrowserRouter>
    </AppProviders>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render, userEvent };
