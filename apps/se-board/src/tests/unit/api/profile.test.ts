import { FetchUserProfileReqsponse, FetchUserSimpleInfoResponse } from "@types";
import { http, HttpResponse } from "msw";

import {
  fetchUserProfile,
  fetchUserSimpleInfo,
  updateUserProfile,
} from "@/api/profile";
import { server } from "@/mocks/node";

describe("프로필 API 호출", () => {
  describe("fetchUserSimpleInfo", () => {
    it("사용자 간단 정보 요청을 GET으로 수행해야 합니다.", async () => {
      const { data: result } = await fetchUserSimpleInfo();

      const expectedResponse: FetchUserSimpleInfoResponse = {
        nickname: "string",
        email: "string",
        userId: 0,
        roles: ["string"],
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.get("/mypage", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await fetchUserSimpleInfo();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("fetchUserProfile", () => {
    it("사용자 ID로 사용자 프로필 요청을 GET으로 수행해야 합니다.", async () => {
      const result = await fetchUserProfile("string");

      const expectedResponse: FetchUserProfileReqsponse = {
        nickname: "string",
        bookmarkCount: 1,
        postCount: 1,
        commentCount: 1,
      };

      expect(result.data).toStrictEqual(expectedResponse);
    });
    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.get("/profile/string", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await fetchUserProfile("string");
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("updateUserProfile", () => {
    // it("사용자 프로필을 PUT으로 업데이트해야 합니다.", async () => {
    //   const updateData = { nickname: "string" };
    //   const result = await updateUserProfile(updateData);
    //   const expectedResponse = { success: true };

    //   expect(result.data).toStrictEqual(expectedResponse);
    // });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.put("/mypage/info", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await updateUserProfile({ nickname: "NewNickname" });
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });
});
