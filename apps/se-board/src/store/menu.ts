import { Menu } from "@types";
import { atom } from "recoil";

export const menuListState = atom<Menu[]>({
  key: "menuListState",
  default: [],
});
