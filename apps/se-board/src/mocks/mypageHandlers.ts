import { http, HttpResponse } from "msw";

export const mypageHandlers = [
  http.get("mypage", () => {
    return HttpResponse.json({
      nickname: "string",
      userId: 0,
      email: "string",
      roles: ["string"],
    });
  }),
];
