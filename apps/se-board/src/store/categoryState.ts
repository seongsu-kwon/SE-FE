import { CategoryInfomation } from "@types";
import { atom } from "recoil";

export const categoryListState = (menuId: number) =>
  atom<CategoryInfomation[]>({
    key: `categoryListState-${menuId}`,
    default: [],
  });
