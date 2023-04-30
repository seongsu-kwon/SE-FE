import { Box } from "@chakra-ui/react";
import { Comment } from "@types";
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
  const { data, isLoading, isError } = useGetCommentQuery(postId, 0);
  const [commentData, setCommentData] = useState<Comment | undefined>(data);

  if (isError) {
    // 에러 화면 렌더링
  }

  useEffect(() => {
    setCommentData(data);
  }, [data]);

  const moreCommentsOnClick = () => {
    // 댓글 더보기 버튼 클릭 시
    if (commentData) {
      const newData = useGetCommentQuery(postId, commentData.number + 1).data; // comment에 data 추가 후 더보기 버튼 클릭 시 기존 데이터와 새로운 데이터 합치기 필요

      if (newData) {
        setCommentData({
          ...newData,
          content: commentData.content.concat(newData.content),
        });
      }
    }
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
