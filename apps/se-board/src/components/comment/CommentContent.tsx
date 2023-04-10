import { Box } from "@chakra-ui/react";
import React from "react";

import { subComment } from "@/@types";
import { Comment } from "@/components/comment";
import { openColors } from "@/styles";

interface CommentContentProps {
  commentId: number;
  author: {
    userId: string | null; // loginId로 수정 필요
    name: string;
  };
  createdAt: string;
  modifiedAt: string;
  contents: string;
  isEditable: boolean;
  subComments?: subComment[];
  replyInputRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

export const CommentContent = ({
  commentId,
  author,
  createdAt,
  modifiedAt,
  contents,
  isEditable,
  subComments,
  replyInputRef,
}: CommentContentProps) => {
  return (
    <Box
      borderTop={{ md: `1px solid ${openColors.gray[3]}` }}
      py={{ base: "8px", md: "0" }}
      bgColor={openColors.gray[1]}
    >
      <Box w="100%" bg={openColors.white} p="16px">
        <Comment
          author={author}
          contents={contents}
          createdAt={createdAt}
          isEditable={isEditable}
          replyInputRef={replyInputRef}
        />
      </Box>
      {subComments?.map((subComment: subComment) => {
        const tagName =
          subComment.tag === commentId
            ? author.name
            : subComments.find(
                (comment) => comment.comment_id === subComment.tag
              )?.author.name;
        return (
          <Box
            key={subComment.comment_id}
            w="100%"
            p={{ base: "16px 16px 16px 36px", md: "16px 16px 16px 64px" }}
            borderTop={`1px solid ${openColors.gray[3]}`}
            bg={openColors.white}
          >
            <Comment
              author={{
                userId: subComment.author.user_id, // loginId로 수정 필요
                name: subComment.author.name,
              }}
              contents={subComment.contents}
              createdAt={subComment.created_at}
              isEditable={subComment.isEditable}
              tag={tagName}
              replyInputRef={replyInputRef}
            />
          </Box>
        );
      })}
    </Box>
  );
};
