import { BannedIds, Nicknames } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const getBannedNickname = () => {
  return _axios<Nicknames>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/accountPolicy/bannedNickname",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const getBannedIds = () => {
  return _axios<BannedIds>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/accountPolicy/bannedId",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const postBannedNickname = (nickname: string) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/accountPolicy/bannedNickname",
    method: HTTP_METHODS.POST,
    data: {
      nickname,
    },
  }).then((res) => res.data);
};

export const postBannedId = (bannedId: string) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/accountPolicy/bannedId",
    method: HTTP_METHODS.POST,
    data: {
      bannedId,
    },
  }).then((res) => res.data);
};

export const deleteBannedNickname = (nickname: string) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/accountPolicy/bannedNickname",
    method: HTTP_METHODS.DELETE,
    data: {
      nickname,
    },
  }).then((res) => res.data);
};

export const deleteBannedId = (bannedId: string) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/accountPolicy/bannedId",
    method: HTTP_METHODS.DELETE,
    data: {
      bannedId,
    },
  }).then((res) => res.data);
};
