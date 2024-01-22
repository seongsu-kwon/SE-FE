import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FetchAdminPostListParams, FetchAdminPostListResponse } from "@types";
import { AxiosError, AxiosResponse } from "axios";

import { adminFetchPostList, adminTrashPost } from "@/api/admin/postManage";
import { queryKeys } from "@/react-query/queryKeys";

export const useAdminFetchPostList = (params?: FetchAdminPostListParams) => {
  return useQuery<
    AxiosResponse<FetchAdminPostListResponse>,
    AxiosError,
    FetchAdminPostListResponse
  >(
    [queryKeys.admin, queryKeys.postList, params],
    () => adminFetchPostList(params),
    {
      select: (res) => res.data,
    }
  );
};

export const useAdminTrashPost = () => {
  const client = useQueryClient();
  const toast = useToast();

  return useMutation((postIds: number[]) => adminTrashPost(postIds), {
    onSuccess: () => {
      client.invalidateQueries([queryKeys.admin, queryKeys.postList]);
      toast({
        title: "게시글을 휴지통으로 보냈습니다.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "게시글을 휴지통으로 보내는데 실패했습니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
};
