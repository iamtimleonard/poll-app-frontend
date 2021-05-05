import { render, screen } from "../test-utils";
import "@testing-library/jest-dom/extend-expect";
import PollsList from "./PollsList";

test("<PollsList />", () => {
  render(<PollsList />);
  expect(screen.getByText(/Choose a poll below:/)).toBeInTheDocument();
});
