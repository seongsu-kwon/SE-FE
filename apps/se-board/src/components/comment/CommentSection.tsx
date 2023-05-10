import { Box } from "@chakra-ui/react";
import { Comment, Content } from "@types";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import {
  CommentBody,
  CommentHeader,
  CommentInput,
  ShowMoreCommentButton,
  SkeletonComment,
} from "@/components/comment";
import { useGetCommentQuery } from "@/react-query/hooks";
import { refetchCommentState, writeCommentState } from "@/store/CommentState";
import { openColors } from "@/styles";
import { errorHandle } from "@/utils/errorHandling";

interface CommentSectionProps {
  postId: string | undefined;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetCommentQuery(postId);
  const [commentData, setCommentData] = useState<Comment | undefined>(
    undefined
  );
  const [isWriteState, setIsWriteState] = useRecoilState(writeCommentState);
  const [refetchComment, setRefetchComment] =
    useRecoilState(refetchCommentState);

  if (isError) {
    errorHandle(error);
  }

  useEffect(() => {
    refetch();
    return setRefetchComment(false);
  }, [refetchComment]);

  useEffect(() => {
    while (hasNextPage) {
      fetchNextPage();
    }

    setIsWriteState(false);
  }, [isWriteState]);

  useEffect(() => {
    if (!data) return;

    const newContents: Content[] = [];

    data.pages.map((page) => {
      newContents.push(...page.content);
    });

    setCommentData({
      paginationInfo: data.pages[data.pages.length - 1].paginationInfo,
      content: newContents,
    });
  }, [data]);

  const moreCommentsOnClick = () => {
    fetchNextPage();
  };

  return (
    <Box
      maxW="100%"
      mx="auto"
      borderBottom={`1px solid ${openColors.gray[3]}`}
      mb="100px"
      textAlign="center"
    >
      <CommentHeader
        commentTotalSize={commentData?.paginationInfo.totalAllSize || 0}
      />
      <CommentInput />
      {isLoading ? (
        <SkeletonComment />
      ) : (
        commentData?.content.map((comment) => (
          <CommentBody
            commentId={comment.commentId}
            author={{
              loginId: comment.author.loginId, // loginId로 수정 필요
              name: comment.author.name,
            }}
            createdAt={comment.createdAt}
            modifiedAt={comment.modifiedAt}
            contents={comment.contents}
            isEditable={comment.isEditable}
            isActive={comment.isActive}
            isReadOnlyAuthor={comment.isReadOnlyAuthor}
            subComments={comment.subComments}
          />
        ))
      )}
      {commentData && !commentData.paginationInfo.last && (
        <ShowMoreCommentButton onClick={moreCommentsOnClick} />
      )}
    </Box>
  );
};
