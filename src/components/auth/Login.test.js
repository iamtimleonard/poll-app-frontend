import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";
import { fireEvent, waitFor } from "@testing-library/react";

test("<Login />", async () => {
  render(<Login />);
  expect(screen.getByRole("button", { name: "submit form" })).toHaveTextContent(
    "Log in"
  );
  expect(
    screen.getByRole("button", { name: "toggle register or log in" })
  ).toHaveTextContent("New User?");
  fireEvent.click(
    screen.getByRole("button", { name: "toggle register or log in" })
  );
  await waitFor(() =>
    screen.getByRole("button", { name: "toggle register or log in" })
  );
  expect(
    screen.getByRole("button", { name: "toggle register or log in" })
  ).toHaveTextContent("Returning user?");
});
