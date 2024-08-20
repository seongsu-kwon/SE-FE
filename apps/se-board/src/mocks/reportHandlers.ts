import { http, HttpResponse } from "msw";

const getReportThresholdHandler = http.get("/admin/report/threshold", () => {
  const response = {
    threshold: 0,
  };
  return HttpResponse.json(response);
});

const postReportThresholdHandler = http.post("/admin/report/threshold", () => {
  return HttpResponse.json({ success: true });
});

export const reportHandlers = [
  getReportThresholdHandler,
  postReportThresholdHandler,
];
