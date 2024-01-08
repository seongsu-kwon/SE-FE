import { DateType, PostMutate } from "@types";

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
  if (isModified) {
    return (
      postData.title !== "" &&
      postData.contents !== "" &&
      postData.categoryId !== -1 &&
      postData.exposeOption.name !== ""
    );
  } else {
    return (
      postData.title !== "" &&
      postData.contents !== "" &&
      postData.categoryId !== -1 &&
      postData.exposeOption.name !== ""
    );
  }
};

export const getExposeOptionName = (exposeOption: string) => {
  switch (exposeOption) {
    case "PUBLIC":
      return "전체";
    case "PRIVACY":
      return "비밀글";
    case "KUMOH":
      return "금오인";
    default:
      return "";
  }
};
