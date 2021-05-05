import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import User from "./User";

test("<User />", () => {
  render(<User />);
  expect(
    screen.getByRole("button", { name: "delete account" })
  ).toBeInTheDocument();
});
