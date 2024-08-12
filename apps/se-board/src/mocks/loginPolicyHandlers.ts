import { http, HttpResponse } from "msw";

const getLoginPolicyHandler = http.get("/admin/loginSettings", () => {
  return HttpResponse.json({
    loginLimitTime: 30,
    loginTryCount: 5,
  });
});

const putLoginPolicyHandler = http.put("/admin/loginSettings", () => {
  return HttpResponse.json({
    data: "true",
  });
});

export const loginPolicyHandlers = [
  getLoginPolicyHandler,
  putLoginPolicyHandler,
];
