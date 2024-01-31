import { DateType, PostDetail, PostMutate } from "@types";

import { isSameDateTime } from "./dateUtils";

export const commentsSizeFormat = (commentsSize: number, max = 99) => {
  return commentsSize > max ? max + "+" : commentsSize + "";
};

export const isModified = (
  createdDateTime: DateType,
  modifiedDateTime: DateType
) => !isSameDateTime(createdDateTime, modifiedDateTime);

export const isWritePostActive = (
  postData: PostMutate,
  isModified: boolean
) => {
  if (postData.title === "") {
    return "제목을 입력해주세요.";
  }

  if (postData.contents === "") {
    return "내용을 입력해주세요.";
  }

  if (postData.categoryId === -1) {
    return "카테고리를 선택해주세요.";
  }

  if (postData.exposeOption.name === "") {
    return "공개 설정을 선택해주세요.";
  }

  return null;
};

export const convertPostInfo = (post: PostDetail) => {
  const {
    postId,
    title,
    author,
    views,
    category,
    createdAt,
    modifiedAt,
    isBookmarked,
    isEditable,
  } = post;

  return {
    postId,
    title,
    author: { loginId: author.loginId || "", name: author.name },
    views,
    category: category.name,
    createdAt,
    modifiedAt,
    bookmarked: isBookmarked,
    isEditable,
  };
};
