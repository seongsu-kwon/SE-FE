import { SubComment } from "@types";

export const getTagName = (
  comment: SubComment,
  superComment: { authorName: string; commentId: number },
  subComments: SubComment[]
) => {
  if (comment.tag === null) {
    return undefined;
  }

  return comment.tag === superComment.commentId
    ? superComment.authorName
    : subComments.find((subComment) => comment.tag === subComment.commentId)
        ?.author.name;
};
