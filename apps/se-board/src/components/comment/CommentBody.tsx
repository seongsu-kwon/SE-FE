import { Box } from "@chakra-ui/react";
import { SubComment, SubCommentInfoType } from "@types";
import React, { useRef, useState } from "react";

import { CommentContent, SubCommentInput } from "@/components/comment";
import { openColors } from "@/styles";
import { getTagName } from "@/utils/commentUtils";

interface CommentBodyProps {
  commentId: number;
  author: {
    loginId: string | null; // loginId로 수정 필요
    name: string;
  };
  createdAt: string;
  modifiedAt: string;
  contents: string;
  isEditable: boolean;
  isActive: boolean;
  subComments?: SubComment[];
}

export const CommentBody = ({
  commentId,
  author,
  createdAt,
  modifiedAt,
  contents,
  isEditable,
  isActive,
  subComments,
}: CommentBodyProps) => {
  const [isWriteSubComment, setIsWriteSubComment] = useState(false);
  const subCommentInputRef = useRef<HTMLTextAreaElement>(null);
  const [subCommentInfo, setSubCommentInfo] = useState<SubCommentInfoType>({
    superCommentId: null,
    tagCommentId: null,
    tagCommentAuthorName: null,
  });

  return (
    <Box
      borderTop={{ md: `1px solid ${openColors.gray[3]}` }}
      py={{ base: "8px", md: "0" }}
    >
      <Box w="100%" bg={openColors.white} p="16px">
        <CommentContent
          superCommentId={commentId}
          commentId={commentId}
          author={author}
          contents={contents}
          createdAt={createdAt}
          isEditable={isEditable}
          isActive={isActive}
          setIsWriteSubComment={setIsWriteSubComment}
          setSubCommentInfo={setSubCommentInfo}
        />
      </Box>
      {subComments?.map((subComment: SubComment) => {
        const tagName = getTagName(
          subComment,
          { authorName: author.name, commentId: commentId },
          subComments
        );
        return (
          <Box
            key={subComment.commentId}
            w="100%"
            p={{ base: "16px 16px 16px 36px", md: "16px 16px 16px 64px" }}
            borderTop={`1px solid ${openColors.gray[3]}`}
            bg={openColors.white}
          >
            <CommentContent
              superCommentId={commentId}
              commentId={subComment.commentId}
              author={{
                loginId: subComment.author.loginId, // loginId로 수정 필요
                name: subComment.author.name,
              }}
              contents={subComment.contents}
              createdAt={subComment.createdAt}
              isEditable={subComment.isEditable}
              isActive={subComment.isActive}
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
          p="16px"
          borderTop={`1px solid ${openColors.gray[3]}`}
          bg={openColors.white}
        >
          <SubCommentInput
            superCommentId={subCommentInfo.superCommentId}
            commentId={undefined}
            tagCommentId={subCommentInfo.tagCommentId}
            subCommentInputRef={subCommentInputRef}
            contents=""
            setIsWriteSubComment={setIsWriteSubComment}
            isWritingReply={true} // 답글 작성 시 true
            isReply={true}
          />
        </Box>
      )}
    </Box>
  );
};
