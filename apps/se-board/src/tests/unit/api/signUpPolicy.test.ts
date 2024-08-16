import { http, HttpResponse } from "msw";

import {
  deleteBannedId,
  deleteBannedNickname,
  getBannedIds,
  getBannedNickname,
  postBannedId,
  postBannedNickname,
} from "@/api/signUpPolicy";
import { server } from "@/mocks/node";

describe("계정 정책 API 호출", () => {
  describe("getBannedNickname", () => {
    it("금지된 닉네임을 가져오기 위해 GET 요청을 보내야 합니다.", async () => {
      const mockResponse = { data: ["nickname1", "nickname2"] };

      const result = await getBannedNickname();

      expect(result).toStrictEqual(mockResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.get("/admin/accountPolicy/bannedNickname", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await getBannedNickname();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("getBannedIds", () => {
    it("금지된 ID를 가져오기 위해 GET 요청을 보내야 합니다.", async () => {
      const mockResponse = { data: ["id1", "id2"] };

      const result = await getBannedIds();

      expect(result).toStrictEqual(mockResponse);
    });
    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.get("/admin/accountPolicy/bannedId", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await getBannedIds();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("postBannedNickname", () => {
    it("금지된 닉네임을 추가하기 위해 POST 요청을 보내야 합니다.", async () => {
      const mockResponse = { data: { success: true } };

      const result = await postBannedNickname("string");

      expect(result).toStrictEqual(mockResponse.data);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.post("/admin/accountPolicy/bannedNickname", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await postBannedNickname("string");
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("postBannedId", () => {
    it("금지된 ID를 추가하기 위해 POST 요청을 보내야 합니다.", async () => {
      const mockResponse = { success: true };

      const result = await postBannedId("string");

      expect(result).toStrictEqual(mockResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.post("/admin/accountPolicy/bannedId", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await postBannedId("string");
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("deleteBannedNickname", () => {
    it("금지된 닉네임을 삭제하기 위해 DELETE 요청을 보내야 합니다.", async () => {
      const mockResponse = { data: { success: true } };

      const result = await deleteBannedNickname("string");

      expect(result).toStrictEqual(mockResponse.data);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.delete("/admin/accountPolicy/bannedNickname", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await deleteBannedNickname("string");
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("deleteBannedId", () => {
    it("금지된 ID를 삭제하기 위해 DELETE 요청을 보내야 합니다.", async () => {
      const mockResponse = { success: true };

      const result = await deleteBannedId("string");

      expect(result).toStrictEqual(mockResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.delete("/admin/accountPolicy/bannedId", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await deleteBannedId("string");
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });
});
