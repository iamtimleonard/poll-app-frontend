import { render, screen } from "../test-utils";
import "@testing-library/jest-dom/extend-expect";
import NewPoll from "./NewPoll";

test("<NewPoll />", () => {
  render(<NewPoll />);
  expect(screen.getByText(/Create a New Poll/)).toBeInTheDocument();
});
