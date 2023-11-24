import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";

import { AccountPanel } from "./AccountPanel";
import { CommentPanel } from "./CommentPanel";
import { PostPanel } from "./PostPanel";

export const RecycleBinContainer = () => {
  const [buttonState, setButtonState] = React.useState("member");

  const viewPanel = () => {
    switch (buttonState) {
      case "member":
        return <AccountPanel />;
      case "post":
        return <PostPanel />;
      case "comment":
        return <CommentPanel />;
      default:
        return <AccountPanel />;
    }
  };

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
      overflowX="auto"
    >
      <HStack
        flexWrap="wrap"
        py="0.25rem"
        borderTop="1px solid"
        borderColor="gray.3"
      >
        <Button
          variant="ghost"
          color={buttonState === "member" ? "primary" : ""}
          onClick={() => {
            setButtonState("member");
          }}
        >
          회원
        </Button>
        <Button
          variant="ghost"
          color={buttonState === "post" ? "primary" : ""}
          onClick={() => {
            setButtonState("post");
          }}
        >
          게시글
        </Button>
        <Button
          variant="ghost"
          color={buttonState === "comment" ? "primary" : ""}
          onClick={() => {
            setButtonState("comment");
          }}
        >
          댓글
        </Button>
      </HStack>
      {viewPanel()}
    </Box>
  );
};
