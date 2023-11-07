import { MenuInfomation } from "@types";
import { atom } from "recoil";

export const categoryListState = (menuId: number) =>
  atom<MenuInfomation[]>({
    key: `categoryListState-${menuId}`,
    default: [],
  });
