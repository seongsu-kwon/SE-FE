import { ReportThreshold } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const getReportThreshold = () => {
  return _axios<ReportThreshold>({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/report/threshold",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const postReportThreshold = (threshold: ReportThreshold) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/report/threshold",
    method: HTTP_METHODS.POST,
    data: threshold,
  });
};
