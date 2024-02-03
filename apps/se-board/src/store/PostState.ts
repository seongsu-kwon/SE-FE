import { atom } from "recoil";

export const writePostState = atom({
  key: "writePostState",
  default: {
    title: "",
    contents: "",
    categoryId: -1,
    pined: false,
    exposeOption: {
      name: "PUBLIC",
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
      name: "PUBLIC",
      password: "",
    },
    attachmentIds: Array<number>(),
  },
});
