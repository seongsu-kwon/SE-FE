import { http, HttpResponse } from "msw";

export const passwordChangeWithoutLoginHandlers = [
  http.post("email/password", () => {
    return new HttpResponse(null, { status: 200 });
  }),
  http.post("email/password/confirm", () => {
    return new HttpResponse(null, { status: 200 });
  }),
  http.post("password", () => {
    return HttpResponse.json({ email: "string" });
  }),
];
