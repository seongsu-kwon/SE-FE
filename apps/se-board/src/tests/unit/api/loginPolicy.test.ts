import { http, HttpResponse } from "msw";

import { getLoginPolicy, putLoginPolicy } from "@/api/loginPolicy";
import { server } from "@/mocks/node";

describe("putLoginLimitTime 테스트 코드", () => {
  it("정확한 URL과 헤더로 GET 요청을 보내고 res.data 확인", async () => {
    const result = await getLoginPolicy();
    expect(result).toStrictEqual({ loginLimitTime: 30, loginTryCount: 5 });
  });
  it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
    server.use(
      http.get("/admin/loginSettings", () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await getLoginPolicy();
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("putLoginPolicy 테스트 코드", () => {
  it("정확한 URL과 헤더로 PUT 요청을 보내고 res.data 확인", async () => {
    const result = await putLoginPolicy({
      loginLimitTime: 30,
      loginTryCount: 5,
    });
    expect(result).toStrictEqual({ data: "true" });
  });
  it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
    server.use(
      http.put("/admin/loginSettings", () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await putLoginPolicy({ loginLimitTime: 30, loginTryCount: 5 });
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});
