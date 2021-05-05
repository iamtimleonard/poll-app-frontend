import { render, screen } from "./test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("<App />", () => {
  render(<App />);
  expect(screen.getByText(/PollBuddy/)).toBeInTheDocument();
});
