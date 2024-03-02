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
    onSuccess: (res) => {
      // 조회가능한 메뉴가 1개라도 있는지 확인
      const hasPermission = Object.values(res).some((v) => 0 < v.length);
      if (!hasPermission) {
        window.alert("접근 권한이 없습니다.");
        window.location.href = "/";
      }
    },
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const useGetAdminDashboard = () => {
  return useQuery(["adminDashboardRoles"], getAdminDashboard, {
    refetchOnWindowFocus: false,
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
