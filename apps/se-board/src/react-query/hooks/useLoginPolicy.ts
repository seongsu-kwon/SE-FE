import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginPolicy } from "@types";

import { getLoginPolicy, putLoginPolicy } from "@/api/loginPolicy";
import { errorHandle } from "@/utils/errorHandling";

export const useGetLoginPolicyQuery = () => {
  return useQuery(["loginPolicy"], getLoginPolicy, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 61,
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const usePostLoginPolicyMutation = () => {
  return useMutation((loginPolicy: LoginPolicy) => putLoginPolicy(loginPolicy));
};
