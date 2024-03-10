import {
  FetchAdminMemberListParams,
  FetchAdminMemberListResponse,
} from "@types";

import { HTTP_METHODS } from "..";
import { _axios, getJWTHeader } from "../axiosInstance";

// 회원 조회
export const adminFetchMemberList = (params?: FetchAdminMemberListParams) => {
  return _axios<FetchAdminMemberListResponse>({
    url: "/admin/accounts",
    method: HTTP_METHODS.GET,
    headers: {
      ...getJWTHeader(),
    },
    params,
  });
};
