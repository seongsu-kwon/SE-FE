import { PostListItem } from "@types";
import { atom } from "recoil";

export const pinedPostListState = atom<PostListItem[]>({
  key: "pinedPostListState",
  default: [],
});

export const postListState = atom<PostListItem[]>({
  key: "postListState",
  default: [],
});
