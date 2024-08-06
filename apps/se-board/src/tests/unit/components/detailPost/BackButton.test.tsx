import { fireEvent, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import React from "react";
import { MemoryRouter } from "react-router-dom";

import { BackButton } from "@/components/detailPost/BackButton";

describe("BackButtonTest", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  it("히스토리가 없을 때 /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <BackButton />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTitle("뒤로가기"));
    expect(console.log).toHaveBeenCalledWith("/");
  });

  it("히스토리가 있을 때 -1", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <BackButton />
      </MemoryRouter>
    );

    window.history.pushState({}, "Test page", "/123");
    fireEvent.click(screen.getByTitle("뒤로가기"));
    expect(console.log).toHaveBeenCalledWith("-1");
  });
});
