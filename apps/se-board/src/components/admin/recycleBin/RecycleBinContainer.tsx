import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import React from "react";

import { Pagination } from "@/components";
import { useRecycleBinParams } from "@/hooks/useRecycleBinParams";
import {
  useGetDeleteCommentsQuery,
  useGetDeletedPostQuery,
} from "@/react-query/hooks";
import { useGetDeleteAccountsQuery } from "@/react-query/hooks/useAccountQuery";

import { AccountPanel } from "./AccountPanel";
import { CommentPanel } from "./CommentPanel";
import { PostPanel } from "./PostPanel";

export const RecycleBinContainer = () => {
  const {
    classification,
    page,
    setPageSearchParam,
    setClassificationSearchParam,
  } = useRecycleBinParams();

  const { data: deletedAccountList, refetch: deletedAccountListRefetch } =
    useGetDeleteAccountsQuery(page, 25);
  const { data: deletedPostList, refetch: deletedPostListRefetch } =
    useGetDeletedPostQuery(page, 25);
  const { data: deletedCommentList, refetch: deletedCommentListRefetch } =
    useGetDeleteCommentsQuery(page, 25);

  const viewPanel = () => {
    switch (classification) {
      case "member":
        return (
          <AccountPanel
            data={deletedAccountList}
            refetch={deletedAccountListRefetch}
          />
        );
      case "post":
        return (
          <PostPanel data={deletedPostList} refetch={deletedPostListRefetch} />
        );
      case "comment":
        return (
          <CommentPanel
            data={deletedCommentList}
            refetch={deletedCommentListRefetch}
          />
        );
      default:
        return (
          <AccountPanel
            data={deletedAccountList}
            refetch={deletedAccountListRefetch}
          />
        );
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
      {viewPanel()}
      <Flex alignItems="center" justifyContent="center" mt="0.5rem">
        <Pagination
          currentPage={
            classification === "member"
              ? deletedAccountList?.pageable.pageNumber || 0
              : classification === "post"
              ? 0
              : deletedCommentList?.pageable.pageNumber || 0
          }
          totalPage={
            classification === "member"
              ? deletedAccountList?.totalPages || 1
              : classification === "post"
              ? 0
              : deletedCommentList?.totalPages || 1
          }
          onChangePage={(page: number) => {
            setPageSearchParam(page);
            window.scrollTo(0, 0);
          }}
        />
      </Flex>
    </Box>
  );
};
