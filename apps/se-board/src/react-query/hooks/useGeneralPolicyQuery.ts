import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteAdminIP,
  deleteBannedIp,
  deleteSpamKeyWord,
  getAdminIPs,
  getBannedIp,
  getSpamKeyWord,
  postAdminIP,
  postBannedIp,
  postSpamKeyWord,
} from "@/api/generalPolicy";
import { errorHandle } from "@/utils/errorHandling";

export const useGetBannedIpQuery = () => {
  return useQuery(["bannedIps"], getBannedIp, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 61,
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const usePostBannedIpMutation = () => {
  return useMutation((ipAddress: string) => postBannedIp(ipAddress), {
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const useDeleteBannedIpMutation = () => {
  return useMutation((ipAddress: string) => deleteBannedIp(ipAddress), {
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const useGetSpamKeyWordQuery = () => {
  return useQuery(["spamKeyWords"], getSpamKeyWord, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 61,
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const usePostSpamKeyWordMutation = () => {
  return useMutation((spamKeyword: string) => postSpamKeyWord(spamKeyword), {
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const useDeleteSpamKeyWordMutation = () => {
  return useMutation((id: number) => deleteSpamKeyWord(id), {
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const useGetAdminIPsQuery = () => {
  return useQuery(["adminIPs"], getAdminIPs, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 61,
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const usePostAdminIPMutation = () => {
  return useMutation((ipAddress: string) => postAdminIP(ipAddress), {
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const useDeleteAdminIPMutation = () => {
  return useMutation((ipAddress: string) => deleteAdminIP(ipAddress), {
    onError: (error) => {
      errorHandle(error);
    },
  });
};
