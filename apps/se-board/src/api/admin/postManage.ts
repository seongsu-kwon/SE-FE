import { FetchAdminPostListParams, FetchAdminPostListResponse } from "@types";

import { HTTP_METHODS } from "..";
import { _axios, getJWTHeader } from "../axiosInstance";
// 게시글 조회
export const adminFetchPostList = (params?: FetchAdminPostListParams) => {
  return _axios<FetchAdminPostListResponse>({
    url: "/admin/posts",
    method: HTTP_METHODS.GET,
    headers: {
      ...getJWTHeader(),
    },
    params,
  });
};

// 게시글 완전 삭제
export const adminDeletePost = (postIds: number[]) => {
  return _axios<void>({
    url: "/admin/posts/permanent",
    method: HTTP_METHODS.DELETE,
    headers: {
      ...getJWTHeader(),
    },
    data: { postIds },
  });
};

// 게시글 휴지통 보내기
export const adminTrashPost = (postIds: number[]) => {
  return _axios<void>({
    url: "/admin/posts",
    method: HTTP_METHODS.DELETE,
    headers: {
      ...getJWTHeader(),
    },
    data: { postIds },
  });
};

// 게시글 복구
export const adminRestorePost = (postIds: number[]) => {
  return _axios<void>({
    url: "/admin/posts/restore",
    method: HTTP_METHODS.POST,
    headers: {
      ...getJWTHeader(),
    },
    data: { postIds },
  });
};
