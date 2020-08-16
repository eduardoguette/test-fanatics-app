import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

test("renders without crashing", () => {
  const { getByText } = render(<App />);
  const title = getByText(/login/i);
  expect(title).toBeInTheDocument();
});

test("login form", async () => {
  render(<App />);
  const input = await screen.findByRole("textbox");
  const button = await screen.findByRole("button");
  fireEvent.change(input, { target: { value: "eve.holt@reqres.in" } });
  fireEvent.click(button);
});
