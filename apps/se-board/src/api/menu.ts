import { Menu } from "@types";

import { HTTP_METHODS } from ".";
import { _axios } from "./axiosInstance";

export const fetchMenuList = () => {
  return _axios<Menu[]>({
    url: "/menu",
    method: HTTP_METHODS.GET,
  });
};
