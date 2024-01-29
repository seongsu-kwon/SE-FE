import { useMutation, useQuery } from "@tanstack/react-query";
import { AdminMenuSettingData } from "@types";

import {
  getAdminDashboard,
  getAdminMenus,
  putAdminMenuRollSetting,
} from "@/api/admin";
import { errorHandle } from "@/utils/errorHandling";

export const useGetAdminMenus = () => {
  return useQuery(["adminDashboard"], getAdminMenus, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetAdminDashboard = () => {
  return useQuery(["adminDashboardRoles"], getAdminDashboard, {
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
    (data: AdminMenuSettingData[]) => putAdminMenuRollSetting(data),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};
