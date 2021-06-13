import { screen } from "@testing-library/react";
import { render } from "../custom-render";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("App component", () => {
  // add a div with #modal-root id to the global body
  const portalRoot = global.document.createElement("div");
  portalRoot.setAttribute("id", "portal");
  const body = global.document.querySelector("body");
  body.appendChild(portalRoot);

  test("renders page heading", async () => {
    render(<App />);
    const title = await screen.findByText(/flickr photo stream/i);
    expect(title).toBeInTheDocument();
  });

  test("renders subheading", async () => {
    render(<App />);
    const subheading = await screen.findByText(/showing.*/i);
    expect(subheading).toBeInTheDocument();
    expect(subheading).toHaveTextContent("Showing All pictures");
  });

  test("renders recommended title and buttons", async () => {
    const { container } = render(<App />);
    const sub_heading = await screen.findByText(/recommended:/i);
    const buttons = container.querySelectorAll(
      "button.chakra-button.css-1xx8uq7"
    );
    expect(sub_heading).toBeInTheDocument();
    expect(buttons.length).toBe(4);
  });

  test("renders search box", async () => {
    const { container } = render(<App />);
    const input = container.querySelector("input");

    expect(input).toBeInTheDocument();
  });
});
