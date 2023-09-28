import { IpInfo } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const getBannedIp = () => {
  return _axios<IpInfo[]>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/ip",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const postBannedIp = (ipAddress: string) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/ip",
    method: HTTP_METHODS.POST,
    data: {
      ipAddress,
    },
  }).then((res) => res.data);
};

export const deleteBannedIp = (ipAddress: string) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/ip",
    method: HTTP_METHODS.DELETE,
    data: {
      ipAddress,
    },
  }).then((res) => res.data);
};
