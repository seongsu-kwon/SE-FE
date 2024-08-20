import { FetchUserProfileReqsponse, FetchUserSimpleInfoResponse } from "@types";
import { http, HttpResponse } from "msw";

const fetchUserSimpleInfoHandler = http.get("/mypage", () => {
  const response: FetchUserSimpleInfoResponse = {
    nickname: "string",
    email: "string",
    userId: 0,
    roles: ["string"],
  };
  return HttpResponse.json(response);
});

const fetchUserProfileHandler = http.get("/profile/:userId", (req) => {
  const { userId } = req.params;

  if (userId === "string") {
    const response: FetchUserProfileReqsponse = {
      nickname: "string",
      bookmarkCount: 1,
      postCount: 1,
      commentCount: 1,
    };
    return HttpResponse.json(response);
  }

  return HttpResponse.json({}, { status: 404 });
});

const updateUserProfileHandler = http.put("/mypage/info", (req) => {
  const response = {
    success: true,
  };

  return HttpResponse.json(response);
});

export const profileHandlers = [
  fetchUserSimpleInfoHandler,
  fetchUserProfileHandler,
  updateUserProfileHandler,
];
