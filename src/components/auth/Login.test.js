import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";

test("login", () => {
  render(<Login />);
  expect(screen.getByRole("button", { name: "submit form" })).toHaveTextContent(
    "Log in"
  );
  expect(
    screen.getByRole("button", { name: "toggle register or log in" })
  ).toHaveTextContent("New User?");
});
