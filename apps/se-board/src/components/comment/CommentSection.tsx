import { Box } from "@chakra-ui/react";
import { Comment, Content } from "@types";
import { useEffect, useState } from "react";

import {
  CommentBody,
  CommentHeader,
  CommentInput,
  ShowMoreCommentButton,
  SkeletonComment,
} from "@/components/comment";
import { useGetCommentQuery } from "@/react-query/hooks";
import { openColors } from "@/styles";

interface CommentSectionProps {
  postId: string | undefined;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    perPage: 25,
  });
  const { data, isLoading, isError, fetchNextPage } =
    useGetCommentQuery(postId);
  const [commentData, setCommentData] = useState<Comment | undefined>(
    undefined
  );

  if (isError) {
    // 에러 화면 렌더링
  }

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
