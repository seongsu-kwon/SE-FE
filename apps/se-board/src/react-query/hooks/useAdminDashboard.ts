import { useMutation, useQuery } from "@tanstack/react-query";
import { AdminSettingRole } from "@types";

import { getAdminDashboard, postAdminMenuRollSetting } from "@/api/admin";
import { errorHandle } from "@/utils/errorHandling";

export const useGetAdminDashboard = () => {
  return useQuery(["adminDashboard"], getAdminDashboard, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const usePostAdminMenuRollSetting = () => {
  return useMutation(
    (data: AdminSettingRole) => postAdminMenuRollSetting(data),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};
