import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FetchAdminMemberListParams,
  FetchAdminMemberListResponse,
} from "@types";
import { AxiosError, AxiosResponse } from "axios";

import {
  adminFetchMemberList,
  adminUpdateMember,
} from "@/api/admin/memberManage";
import { queryKeys } from "@/react-query/queryKeys";

export const useAdminFetchMemberList = (
  params?: FetchAdminMemberListParams
) => {
  return useQuery<
    AxiosResponse<FetchAdminMemberListResponse>,
    AxiosError,
    FetchAdminMemberListResponse
  >(
    [queryKeys.admin, queryKeys.memberList, params],
    () => adminFetchMemberList(params),
    {
      select: (res) => res.data,
      keepPreviousData: true,
    }
  );
};

export const useAdminUpdateMenber = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    (data: {
      accountId: number;
      id: string;
      password: string;
      name: string;
      nickname: string;
      roles: number[];
    }) =>
      adminUpdateMember(data.accountId, {
        id: data.id,
        password: data.password,
        name: data.name,
        nickname: data.nickname,
        roles: data.roles,
      }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries([queryKeys.admin, queryKeys.memberList]);
        toast({
          title: "수정이 완료되었습니다",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: { code: number; message: string }) => {
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );
};
