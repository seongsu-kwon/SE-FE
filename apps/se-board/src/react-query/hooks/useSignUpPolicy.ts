import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteBannedId,
  deleteBannedNickname,
  getBannedIds,
  getBannedNickname,
  postBannedId,
  postBannedNickname,
} from "@/api/signUpPolicy";
import { errorHandle } from "@/utils/errorHandling";

export const useGetBannedNicknameQuery = () => {
  return useQuery(["bannedNickname"], getBannedNickname, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 61,
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const useGetBannedIdsQuery = () => {
  return useQuery(["bannedId"], getBannedIds, {
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const usePostBannedNicknameMutation = () => {
  return useMutation((nickname: string) => postBannedNickname(nickname));
};

export const usePostBannedIdMutation = () => {
  return useMutation((bannedId: string) => postBannedId(bannedId));
};

export const useDeleteBannedNicknameMutation = () => {
  return useMutation((nickname: string) => deleteBannedNickname(nickname));
};

export const useDeleteBannedIdMutation = () => {
  return useMutation((bannedId: string) => deleteBannedId(bannedId));
};
