import { FetchUserSimpleInfoResponse } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const fetchUserSimpleInfo = async () => {
  return _axios<FetchUserSimpleInfoResponse>({
    url: "mypage",
    method: HTTP_METHODS.GET,
    headers: getJWTHeader(),
  });
};
