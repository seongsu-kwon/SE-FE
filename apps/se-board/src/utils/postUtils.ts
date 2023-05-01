import { DateType } from "@types";
import { useRecoilState } from "recoil";

import { modifyPostState, writePostState } from "@/store";

import { isSameDateTime } from "./dateUtils";

export const commentsSizeFormat = (commentsSize: number, max = 99) =>
  commentsSize > max ? max + "+" : commentsSize + "";

export const isModified = (
  createdDateTime: DateType,
  modifiedDateTime: DateType
) => !isSameDateTime(createdDateTime, modifiedDateTime);

export const isWritePostActive = (isModified: boolean) => {
  const [writePost, setWritePost] = useRecoilState(writePostState);
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);

  if (isModified) {
    return (
      modifyPost.title !== "" &&
      modifyPost.contents !== "" &&
      modifyPost.categoryId !== -1 &&
      modifyPost.exposeOption.name !== ""
    );
  } else {
    return (
      writePost.title !== "" &&
      writePost.contents !== "" &&
      writePost.categoryId !== -1 &&
      writePost.exposeOption.name !== ""
    );
  }
};
