import { Box, useColorModeValue } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Comment, CommentPaginationInfo } from "@types";
import { useEffect, useState } from "react";

import { useGetCommentQuery } from "@/react-query/hooks";

import { CommentContents } from "./CommentContents";
import { CommentHeader } from "./CommentHeader";
import { CommentInput } from "./CommentInput";
import { ShowMoreCommentButton } from "./ShowMoreCommentButton";
import { SkeletonComment } from "./SkeletonComment";

interface CommentSectionProps {
  postId: string | undefined;
  isPostRequestError: boolean;
  password?: string;
}

export const CommentSection = ({
  postId,
  isPostRequestError,
  password,
}: CommentSectionProps) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useGetCommentQuery(isPostRequestError, postId, password);

  const queryClient = useQueryClient();

  const [comments, setComments] = useState<Comment[]>([]);
  const [pagenationInfo, setPagenationInfo] = useState<CommentPaginationInfo>();

  useEffect(() => {
    queryClient.invalidateQueries(["comments", postId]);
  }, []);

  useEffect(() => {
    if (!data) return;

    setPagenationInfo(data.pages[data.pages.length - 1].paginationInfo);
    setComments(data.pages.map((page) => page.content).flat());
  }, [data]);

  const color = useColorModeValue("gray.7", "whiteAlpha.700");
  const borderColor = useColorModeValue("gray.3", "whiteAlpha.400");

  return (
    <Box
      maxW="100%"
      mx="auto"
      borderBottom={`1px solid`}
      borderColor={borderColor}
      mb="100px"
      textAlign="center"
      color={color}
    >
      <CommentHeader commentTotalSize={pagenationInfo?.totalAllSize || 0} />
      <CommentInput />
      {isLoading ? (
        <SkeletonComment />
      ) : (
        <CommentContents comments={comments} />
      )}
      {!pagenationInfo?.last && (
        <ShowMoreCommentButton
          onClick={() => fetchNextPage()}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </Box>
  );
};
