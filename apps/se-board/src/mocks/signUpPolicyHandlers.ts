import { http, HttpResponse } from "msw";

const getBannedNicknameHandler = http.get(
  "/admin/accountPolicy/bannedNickname",
  () => {
    const mockResponse = { data: ["nickname1", "nickname2"] };
    return HttpResponse.json(mockResponse);
  }
);

const getBannedIdsHandler = http.get("/admin/accountPolicy/bannedId", () => {
  const mockResponse = { data: ["id1", "id2"] };
  return HttpResponse.json(mockResponse);
});

const postBannedNicknameHandler = http.post(
  "/admin/accountPolicy/bannedNickname",
  (req) => {
    return HttpResponse.json({ success: true });
  }
);

const postBannedIdHandler = http.post(
  "/admin/accountPolicy/bannedId",
  (req) => {
    return HttpResponse.json({ success: true });
  }
);

const deleteBannedNicknameHandler = http.delete(
  "/admin/accountPolicy/bannedNickname",
  (req) => {
    return HttpResponse.json({ success: true });
  }
);

const deleteBannedIdHandler = http.delete(
  "/admin/accountPolicy/bannedId",
  () => {
    return HttpResponse.json({ success: true });
  }
);

export const signUpPolicyHandlers = [
  getBannedNicknameHandler,
  getBannedIdsHandler,
  postBannedNicknameHandler,
  postBannedIdHandler,
  deleteBannedNicknameHandler,
  deleteBannedIdHandler,
];
