import { Box, Button, HStack } from "@chakra-ui/react";

import { useRecycleBinParams } from "@/hooks/useRecycleBinParams";

import { AccountPanel } from "./AccountPanel";
import { CommentPanel } from "./CommentPanel";
import { PostPanel } from "./PostPanel";

export const RecycleBinContainer = () => {
  const { classification, setClassificationSearchParam } =
    useRecycleBinParams();

  const getPanel = (classification: string) => {
    if (classification === "member" || classification === "") {
      return <AccountPanel />;
    } else if (classification === "post") {
      return <PostPanel />;
    } else {
      return <CommentPanel />;
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
          color={
            classification === "member" || classification === ""
              ? "primary"
              : ""
          }
          onClick={() => {
            setClassificationSearchParam("member");
          }}
        >
          회원
        </Button>
        <Button
          variant="ghost"
          color={classification === "post" ? "primary" : ""}
          onClick={() => {
            setClassificationSearchParam("post");
          }}
        >
          게시글
        </Button>
        <Button
          variant="ghost"
          color={classification === "comment" ? "primary" : ""}
          onClick={() => {
            setClassificationSearchParam("comment");
          }}
        >
          댓글
        </Button>
      </HStack>
      {getPanel(classification)}
    </Box>
  );
};
