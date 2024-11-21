import { render, screen } from "@testing-library/react";
import CreateAccount from "./CreateAccPage/createAccount";

test("renders learn react link", () => {
  render(<CreateAccount />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
