import { MainPageMenu } from "@types";

export const isCheckedMenuCount = (
  menuList: (MainPageMenu & { isChecked: boolean })[]
) => {
  return menuList.filter((menu) => menu.isChecked).length;
};
