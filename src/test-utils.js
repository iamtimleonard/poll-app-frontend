import { render } from "@testing-library/react";
import { UserContextProvider } from "./context/user";
import { PollsContextProvider } from "./context/polls";

const AllProviders = ({ children }) => {
  return (
    <UserContextProvider>
      <PollsContextProvider>{children}</PollsContextProvider>
    </UserContextProvider>
  );
};

const customRender = (ui, options) => {
  render(ui, { wrapper: AllProviders, ...options });
};

export * from "@testing-library/react";

export { customRender as render };
