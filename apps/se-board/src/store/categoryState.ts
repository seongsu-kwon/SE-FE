import { MenuInfomation } from "@types";
import { atom, RecoilEnv } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const categoryListState = (menuId: number) =>
  atom<MenuInfomation[]>({
    key: `categoryListState-${menuId}`,
    default: [],
  });
