import { useMutation, useQuery } from "@tanstack/react-query";
import { ReportThreshold } from "@types";

import { getReportThreshold, postReportThreshold } from "@/api/report";
import { errorHandle } from "@/utils/errorHandling";

export const useGetReportThreshold = () => {
  return useQuery(["reportThreshold"], getReportThreshold, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 61,
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const usePostReportThreshold = () => {
  return useMutation(
    (threshold: ReportThreshold) => postReportThreshold(threshold),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};
