import { Box } from "@chakra-ui/react";
import { Comment } from "@types";

import { Comment as CommentContent } from "./Comment";

interface CommentContentsProps {
  comments: Comment[];
}

export const CommentContents = ({ comments }: CommentContentsProps) => {
  return (
    <Box>
      {comments.map((comment, idx) => (
        <CommentContent key={idx} comment={comment} />
      ))}
    </Box>
  );
};
