import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";

import { Bookmark, BookmarkFill } from "@/components/detailPost";

describe("BookmarkTest", () => {
  it("북마크 아이콘", () => {
    render(
      <ChakraProvider>
        <Bookmark toggleBookmark={() => {}} />
      </ChakraProvider>
    );
    expect(screen.getByTitle("Bookmark")).toBeTruthy();
    expect(screen.queryByTitle("BookmarkFill")).toBeNull();
  });

  it("북마크 채워진 아이콘", () => {
    render(
      <ChakraProvider>
        <BookmarkFill toggleBookmark={() => {}} />
      </ChakraProvider>
    );
    expect(screen.getByTitle("BookmarkFill")).toBeTruthy();
    expect(screen.queryByTitle("Bookmark")).toBeNull();
  });
});
