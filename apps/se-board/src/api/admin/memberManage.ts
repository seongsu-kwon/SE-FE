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

export const adminUpdateMember = (
  accountId: number,
  data: {
    id: string;
    password: string;
    name: string;
    nickname: string;
    roles: number[];
  }
) => {
  return _axios<void>({
    url: `/admin/accounts/${accountId}`,
    method: HTTP_METHODS.PUT,
    headers: {
      ...getJWTHeader(),
    },
    data,
  });
};

// 회원 삭제(휴지통)
export const adminDeleteMember = (accountId: number) => {
  return _axios<void>({
    url: `/admin/accounts/${accountId}`,
    method: HTTP_METHODS.DELETE,
    headers: {
      ...getJWTHeader(),
    },
  });
};

// 백엔드 미구현 임시
export const adminDeleteMembers = (accountIds: number[]) => {
  return _axios<void>({
    url: "/admin/accounts",
    method: HTTP_METHODS.DELETE,
    headers: {
      ...getJWTHeader(),
    },
    data: {
      accountIds,
    },
  });
};
