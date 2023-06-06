import { FetchUserProfileReqsponse, FetchUserSimpleInfoResponse } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const fetchUserSimpleInfo = async () => {
  return _axios<FetchUserSimpleInfoResponse>({
    url: "mypage",
    method: HTTP_METHODS.GET,
    headers: getJWTHeader(),
  });
};

export const fetchUserProfile = async (userId: string) => {
  return _axios<FetchUserProfileReqsponse>({
    url: `profile/${userId}`,
    method: HTTP_METHODS.GET,
    headers: getJWTHeader(),
  });
};

export const updateUserProfile = async (data: { nickname: string }) => {
  return _axios({
    url: "mypage/info",
    method: HTTP_METHODS.PUT,
    headers: getJWTHeader(),
    data,
  });
};
