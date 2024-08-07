import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { Attachment } from "@types";

import { AttachmentFile } from "@/components/detailPost";

describe("AttachmentFileTest", () => {
  it("첨부파일이 없을 경우", () => {
    const files: Attachment[] = [];
    render(
      <ChakraProvider>
        <AttachmentFile files={files} />
      </ChakraProvider>
    );
    expect(screen.queryByText("originaltest1")).toBeNull();
    expect(screen.queryByText("originaltest2")).toBeNull();
  });

  it("첨부파일이 한개일 경우", () => {
    const files: Attachment[] = [
      {
        fileMetaDataId: 1,
        originalFileName: "originaltest1",
        url: "test1url",
        storedFileName: "storedtest1",
      },
    ];
    render(
      <ChakraProvider>
        <AttachmentFile files={files} />
      </ChakraProvider>
    );
    expect(screen.queryByText("originaltest1")).toBeTruthy();
    expect(screen.queryByText("originaltest2")).toBeNull();
  });

  it("첨부파일이 여러개일 경우", () => {
    const files: Attachment[] = [
      {
        fileMetaDataId: 1,
        originalFileName: "originaltest1",
        url: "test1url",
        storedFileName: "storedtest1",
      },
      {
        fileMetaDataId: 2,
        originalFileName: "originaltest2",
        url: "test2url",
        storedFileName: "storedtest2",
      },
    ];
    render(
      <ChakraProvider>
        <AttachmentFile files={files} />
      </ChakraProvider>
    );
    expect(screen.queryByText("originaltest1")).toBeTruthy();
    expect(screen.queryByText("originaltest2")).toBeTruthy();
  });
});
