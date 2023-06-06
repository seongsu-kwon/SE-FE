import { useQuery } from "@tanstack/react-query";

import { getAdminDashboard } from "@/api/admin";
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
