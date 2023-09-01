import { Menu, MenuInfomation } from "@types";
import { atom } from "recoil";

export const menuListState = atom<Menu[]>({
  key: "menuListState",
  default: [],
});

export const boardMenuListState = atom<MenuInfomation[]>({
  key: "boardMenuListState",
  default: [],
});
