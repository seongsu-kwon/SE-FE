import { http, HttpResponse } from "msw";

export const getLoginPolicyHandler = [
  http.get("/admin/loginSettings", () => {
    return HttpResponse.json({
      loginLimitTime: 30,
      loginTryCount: 5,
    });
  }),
];

export const putLoginPolicyHandler = [
  http.put("/admin/loginSettings", () => {
    return HttpResponse.json({
      data: "true",
    });
  }),
];
