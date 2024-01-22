import { AdminSettingRole } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const getAdminDashboard = () => {
  return _axios<AdminSettingRole>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/dashboard",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const postAdminMenuRollSetting = (data: AdminSettingRole) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/dashboard",
    method: HTTP_METHODS.POST,
    data,
  }).then((res) => res.data);
};
