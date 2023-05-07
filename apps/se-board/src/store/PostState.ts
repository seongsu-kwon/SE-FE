import { Attachment } from "@types";
import { atom } from "recoil";

export const writePostState = atom({
  key: "writePostState",
  default: {
    title: "",
    contents: "",
    categoryId: 43214233,
    pined: false,
    exposeOption: {
      name: "",
      password: "",
    },
    attachmentIds: Array<number>(),
    anonymous: false,
  },
});

export const modifyPostState = atom({
  key: "modifyPostState",
  default: {
    title: "",
    contents: "",
    categoryId: -1,
    pined: false,
    exposeOption: {
      name: "",
      password: "",
    },
    attachmentIds: Array<number>(),
  },
});

export const beforePostState = atom({
  key: "beforePostState",
  default: {
    postId: -1,
    title: "",
    contents: "",
    category: {
      categoryId: -1,
      name: "",
    },
    isPined: false,
    exposeType: "",
    attachments: {
      fileMetaDataList: Array<Attachment>(),
    },
  },
});
