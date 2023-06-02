import { Menu, MenuList, SubMenus } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const fetchMenuList = () => {
  return _axios<Menu[]>({
    url: "/menu",
    method: HTTP_METHODS.GET,
  });
};

export const getMenuList = () => {
  return _axios<MenuList>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/menu",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const getCategory = (categoryId: number) => {
  return _axios<SubMenus>({
    headers: {
      ...getJWTHeader(),
    },
    url: `/admin/menu/${categoryId}`,
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};
