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

export const postPaginationState = atom({
  key: "postPaginationState",
  default: {
    currentPage: 0,
    totalPages: 0,
    perPage: 40,
  },
});
