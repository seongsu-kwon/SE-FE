import { AdminMenuSettingData, Menu, MenuInfomation } from "@types";
import { atom } from "recoil";

export const menuListState = atom<Menu[]>({
  key: "menuListState",
  default: [],
});

export const boardMenuListState = atom<MenuInfomation[]>({
  key: "boardMenuListState",
  default: [],
});

export const newSEMenuState = atom<string>({
  key: "newSEMenuState",
  default: "",
});

export const allMenuListState = atom<MenuInfomation[]>({
  key: "allMenuListState",
  default: [],
});

export const adminMenuRollSettingState = atom<AdminMenuSettingData[]>({
  key: "adminMenuRollSettingState",
  default: [],
});
