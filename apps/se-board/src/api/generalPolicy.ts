import { AdminIP, IpInfo, SpamKeyword } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const getBannedIp = () => {
  return _axios<IpInfo[]>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/ip?ipType=SPAM",
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
      ipType: "SPAM",
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

export const getSpamKeyWord = () => {
  return _axios<SpamKeyword[]>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/spamword",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const postSpamKeyWord = (spamKeyWord: string) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/spamword",
    method: HTTP_METHODS.POST,
    data: {
      word: spamKeyWord,
    },
  }).then((res) => res.data);
};

export const deleteSpamKeyWord = (id: number) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: `/admin/spamword/${id}`,
    method: HTTP_METHODS.DELETE,
  }).then((res) => res.data);
};

export const getAdminIPs = () => {
  return _axios<AdminIP[]>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/ip?ipType=ADMIN",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const postAdminIP = (ipAddress: string) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/ip",
    method: HTTP_METHODS.POST,
    data: {
      ipAddress,
      ipType: "ADMIN",
    },
  }).then((res) => res.data);
};

export const deleteAdminIP = (ipAddress: string) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: `/admin/ip`,
    method: HTTP_METHODS.DELETE,
    data: {
      ipAddress,
    },
  }).then((res) => res.data);
};
