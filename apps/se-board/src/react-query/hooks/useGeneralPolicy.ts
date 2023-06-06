import { useMutation, useQuery } from "@tanstack/react-query";

import { deleteBannedIp, getBannedIp, postBannedIp } from "@/api/generalPolicy";
import { errorHandle } from "@/utils/errorHandling";

export const useGetBannedIpQuery = () => {
  return useQuery(["bannedIp"], getBannedIp, {
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const usePostBannedIpMutation = () => {
  return useMutation((ipAddress: string) => postBannedIp(ipAddress));
};

export const useDeleteBannedIpMutation = () => {
  return useMutation((ipAddress: string) => deleteBannedIp(ipAddress));
};
