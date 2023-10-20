import { SubCommentContent } from "@types";

export const getTagName = (
  comment: SubCommentContent,
  superComment: { authorName: string; commentId: number },
  subComments: SubCommentContent[]
) => {
  if (comment.tag === null) {
    return undefined;
  }

  return comment.tag === superComment.commentId
    ? superComment.authorName
    : subComments.find((subComment) => comment.tag === subComment.commentId)
        ?.author.name;
};
