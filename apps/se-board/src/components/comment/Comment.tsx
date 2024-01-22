import { Box } from "@chakra-ui/react";
import { Comment as CommentType } from "@types";
import { useRef, useState } from "react";

import { openColors } from "@/styles";

import { SubCommentInput } from ".";
import { CommentFormation } from "./CommentFormation";

interface CommentProps {
  comment: CommentType;
}

export const Comment = ({ comment }: CommentProps) => {
  const [isWriteState, setIsWriteState] = useState<number | null>(null);

  const subCommentAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Box
      borderTop={`1px solid ${openColors.gray[3]}`}
      py={{ base: "0.0125rem", md: "0" }}
    >
      <CommentFormation comment={comment} setIsWriteState={setIsWriteState} />
      {comment.subComments.map((subComment) => (
        <Box
          key={subComment.commentId}
          w="100%"
          pl={{
            base: "36px",
            md: "64px",
          }}
          borderTop={`1px solid ${openColors.gray[3]}`}
          bg={openColors.white}
        >
          <CommentFormation
            comment={subComment}
            setIsWriteState={setIsWriteState}
            tag={comment.author.name}
          />
        </Box>
      ))}
      {isWriteState !== null && (
        <Box borderTop={`1px solid ${openColors.gray[3]}`} py="0.5rem">
          <SubCommentInput
            superCommentId={comment.commentId}
            tagCommentId={isWriteState}
            inputRef={subCommentAreaRef}
            setIsWriteState={setIsWriteState}
          />
        </Box>
      )}
    </Box>
  );
};
