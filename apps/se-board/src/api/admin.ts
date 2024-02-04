import {
  AdminMenuDashBoard,
  AdminMenuMenuAndRole,
  AdminMenuSettingData,
} from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const getAdminMenus = () => {
  return _axios<AdminMenuDashBoard>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/dashboard",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const getAdminDashboard = () => {
  return _axios<AdminMenuMenuAndRole>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/dashboard/setting",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const putAdminMenuRollSetting = (data: AdminMenuSettingData[]) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/dashboard/setting",
    method: HTTP_METHODS.PUT,
    data: { menus: data },
  }).then((res) => res.data);
};
