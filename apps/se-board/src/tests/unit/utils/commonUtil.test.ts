import { SubCommentContent } from "@types";

import { getTagName } from "@/utils/commentUtils";

let subComment: SubCommentContent = {
  tag: null,
  commentId: 90,
  author: {
    userId: "",
    name: "string",
  },
  createdAt: "string",
  modifiedAt: "string",
  contents: "string",
  isEditable: true,
  isActive: true,
  isReadOnlyAuthor: true,
};

const superComment = {
  authorName: "superComment",
  commentId: 1,
};

const subComments: SubCommentContent[] = [];

describe("commentUtil test", () => {
  it("When comment.tag is null, should return undefined", () => {
    expect(getTagName(subComment, superComment, subComments)).toBeUndefined();
  });

  it("When subComment's tag is the same with superComment's commentId, it should return superComment's authorName", () => {
    const sameCommentId = 1;
    const testSubComment: SubCommentContent = {
      ...subComment,
      tag: sameCommentId,
    };
    const testSuperComment = { ...superComment, commentId: sameCommentId };
    expect(getTagName(testSubComment, testSuperComment, subComments)).toBe(
      "superComment"
    );
  });

  it("When subComment's tag is different with superComment's commentId, it should return subComment's authorName where comment's tag is the same with subComment's commentId", () => {
    const sameCommentId = 1;
    const differentSuperComment = { ...superComment, commentId: 100 };
    const testSubComment: SubCommentContent = {
      ...subComment,
      tag: sameCommentId,
      author: {
        userId: "test",
        name: "철수",
      },
    };
    const sameSubComment: SubCommentContent = {
      ...subComment,
      commentId: sameCommentId,
      author: {
        userId: "userId",
        name: "홍길동",
      },
    };
    const testSubComments: SubCommentContent[] = [sameSubComment];
    expect(
      getTagName(testSubComment, differentSuperComment, testSubComments)
    ).toBe("홍길동");
  });
});
