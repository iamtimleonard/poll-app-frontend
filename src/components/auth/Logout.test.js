import { render, screen } from "@testing-library/react";
import { UserContextProvider } from "../../context/user";
import "@testing-library/jest-dom/extend-expect";
import Logout from "./Logout";

test("logout", () => {
  render(
    <UserContextProvider>
      <Logout />
    </UserContextProvider>
  );
  expect(screen.getByRole("button")).toHaveTextContent("Logout");
});
