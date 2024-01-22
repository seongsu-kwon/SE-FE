import { Box } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { Comment, CommentPaginationInfo } from "@types";
import { useEffect, useState } from "react";

import { useGetCommentQuery } from "@/react-query/hooks";
import { openColors } from "@/styles";

import { CommentContents } from "./CommentContents";
import { CommentHeader } from "./CommentHeader";
import { CommentInput } from "./CommentInput";
import { ShowMoreCommentButton } from "./ShowMoreCommentButton";
import { SkeletonComment } from "./SkeletonComment";

interface CommentSectionProps {
  postId: string | undefined;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useGetCommentQuery(postId);

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

  return (
    <Box
      maxW="100%"
      mx="auto"
      borderBottom={`1px solid ${openColors.gray[3]}`}
      mb="100px"
      textAlign="center"
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
