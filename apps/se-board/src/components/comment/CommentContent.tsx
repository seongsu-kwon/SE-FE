import { Box } from "@chakra-ui/react";
import { subComment, subCommentInfoType } from "@types";
import React, { useRef, useState } from "react";

import { Comment, SubCommentInput } from "@/components/comment";
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
}

export const CommentContent = ({
  commentId,
  author,
  createdAt,
  modifiedAt,
  contents,
  isEditable,
  subComments,
}: CommentContentProps) => {
  const [isWriteSubComment, setIsWriteSubComment] = useState(false);
  const subCommentInputRef = useRef<HTMLTextAreaElement>(null);
  const [subCommentInfo, setSubCommentInfo] = useState<subCommentInfoType>({
    superCommentId: null,
    tagCommentId: null,
    tagCommentAuthorName: null,
  });

  return (
    <Box
      borderTop={{ md: `1px solid ${openColors.gray[3]}` }}
      py={{ base: "8px", md: "0" }}
      bgColor={openColors.gray[1]}
    >
      <Box w="100%" bg={openColors.white} p="16px">
        <Comment
          superCommentId={commentId}
          commentId={commentId}
          author={author}
          contents={contents}
          createdAt={createdAt}
          isEditable={isEditable}
          setIsWriteSubComment={setIsWriteSubComment}
          setSubCommentInfo={setSubCommentInfo}
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
              superCommentId={commentId}
              commentId={subComment.comment_id}
              author={{
                userId: subComment.author.loginId, // loginId로 수정 필요
                name: subComment.author.name,
              }}
              contents={subComment.contents}
              createdAt={subComment.created_at}
              isEditable={subComment.isEditable}
              tag={tagName}
              setIsWriteSubComment={setIsWriteSubComment}
              setSubCommentInfo={setSubCommentInfo}
            />
          </Box>
        );
      })}
      {isWriteSubComment && (
        <Box
          w="100%"
          p={{ base: "16px 16px 16px 16px", md: "16px 16px 16px 16px" }}
          borderTop={`1px solid ${openColors.gray[3]}`}
          bg={openColors.white}
          onFocus={() => {}}
        >
          <SubCommentInput
            superCommentId={subCommentInfo.superCommentId}
            tagCommentId={subCommentInfo.tagCommentId}
            tagCommentAuthorName={subCommentInfo.tagCommentAuthorName}
            subCommentInputRef={subCommentInputRef}
            setIsWriteSubComment={setIsWriteSubComment}
          />
        </Box>
      )}
    </Box>
  );
};
