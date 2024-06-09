import { LoginPolicy } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const getLoginPolicy = () => {
  return _axios<LoginPolicy>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/loginSettings",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const putLoginPolicy = (LoginPolicy: LoginPolicy) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/loginSettings",
    method: HTTP_METHODS.PUT,
    data: LoginPolicy,
  }).then((res) => res.data);
};
