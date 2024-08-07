import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";

import { BackButton } from "@/components/detailPost/BackButton";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

describe("BackButtonTest", () => {
  beforeEach(() => {
    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={["/"]}>
          <BackButton />
        </MemoryRouter>
      </ChakraProvider>
    );
  });

  it("히스토리가 없을 때 /", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByTitle("뒤로가기"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("히스토리가 있을 때 -1", async () => {
    window.history.pushState({}, "Test page", "/test");
    const user = userEvent.setup();
    await user.click(screen.getByTitle("뒤로가기"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
