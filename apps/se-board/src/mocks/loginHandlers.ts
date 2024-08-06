import { http, HttpResponse } from "msw";

export const putLoginLimitTimeHandler = [
  http.put("/admin/accountPolicy/login/time", () => {
    return HttpResponse.json({
      data: "true",
    });
  }),
];
