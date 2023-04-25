import { atom } from "recoil";

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
    attachments: Array<File>(),
  },
});
