// Custom render wrapper for testing with state in context

import React from "react";
import { render } from "@testing-library/react";

import { DataProvider } from "./src/context/dataContext";

const Wrapper = ({ children }) => {
  return <DataProvider>{children}</DataProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
