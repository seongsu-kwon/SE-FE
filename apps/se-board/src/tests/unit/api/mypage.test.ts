import { http, HttpResponse } from "msw";

import { fetchUserSimpleInfo } from "@/api/myPage";
import { server } from "@/mocks/node";

describe("mypage.ts 테스트 코드", () => {
  it("사용자의 정보를 가져온다.", async () => {
    const properResult = {
      nickname: "string",
      userId: 0,
      email: "string",
      roles: ["string"],
    };
    const result = await fetchUserSimpleInfo();
    expect(result.data).toStrictEqual(properResult);
  });
  it("사용자의 정보를 가져오는데 실패한다.", async () => {
    server.use(
      http.get("mypage", async () => {
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
