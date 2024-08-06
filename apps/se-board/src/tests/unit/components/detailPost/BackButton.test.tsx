import { ChakraProvider } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it("히스토리가 없을 때 /", () => {
    fireEvent.click(screen.getByTitle("뒤로가기"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("히스토리가 있을 때 -1", () => {
    window.history.pushState({}, "Test page", "/test");
    fireEvent.click(screen.getByTitle("뒤로가기"));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
