import { useQuery } from "@tanstack/react-query";
import {
  FetchAdminMemberListParams,
  FetchAdminMemberListResponse,
} from "@types";
import { AxiosError, AxiosResponse } from "axios";

import { adminFetchMemberList } from "@/api/admin/memberManage";
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
    }
  );
};
