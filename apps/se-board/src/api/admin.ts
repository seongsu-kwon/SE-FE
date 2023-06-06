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
