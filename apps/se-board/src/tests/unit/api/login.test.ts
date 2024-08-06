import { http, HttpResponse } from "msw";

import { putLoginLimitTime } from "@/api/login";
import { server } from "@/mocks/node";

describe("putLoginLimitTime 테스트 코드", () => {
  const time = 30;
  it("정확한 URL과 헤더로 PUT 요청을 보내고 res.data 확인", async () => {
    const result = await putLoginLimitTime(time);
    expect(result).toStrictEqual({ data: "true" });
  });
  it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
    server.use(
      http.put("/admin/accountPolicy/login/time", () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await putLoginLimitTime(time);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});
