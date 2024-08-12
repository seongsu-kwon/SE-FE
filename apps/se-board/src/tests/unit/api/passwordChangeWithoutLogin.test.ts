import { http, HttpResponse } from "msw";

import {
  changePasswordWithoutLogin,
  checkPasswordChangeAuthCode,
  requestPasswordChangeEmailAuthCode,
} from "@/api/passwordChangeWithoutLogin";
import { server } from "@/mocks/node";

describe("requestPasswordChangeEmailAuthCode 테스트 코드", () => {
  const email: string = "test@test.com";
  it("비밀번호 변경 이메일 인증 요청", async () => {
    const result = await requestPasswordChangeEmailAuthCode(email);
    expect(result.status).toStrictEqual(200);
  });
  it("비밀번호 변경 이메일 인증 요청 실패", async () => {
    server.use(
      http.post("email/password", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await requestPasswordChangeEmailAuthCode(email);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("checkPasswordChangeAuthCode 테스트 코드", () => {
  const email: string = "test@test.com";
  const authToken: string = "slakdfjlksdjflksajdfkljsdlkfjlsadlfj";
  const data = {
    email: email,
    authToken: authToken,
  };
  it("비밀번호 변경 이메일 인증 확인", async () => {
    const result = await checkPasswordChangeAuthCode(data);
    expect(result.status).toStrictEqual(200);
  });
  it("비밀번호 변경 이메일 인증 확인 실패", async () => {
    server.use(
      http.post("email/password/confirm", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await checkPasswordChangeAuthCode(data);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("changePasswordWithoutLogin 테스트 코드", () => {
  const email: string = "test@test.com";
  const password: string = "12345!@";
  const data = {
    email: email,
    password: password,
  };
  it("아이디를 이용하여 비밀번호 변경", async () => {
    const result = await changePasswordWithoutLogin(data);
    expect(result.status).toStrictEqual(200);
  });
  it("아이디를 이용하여 비밀번호 변경 실패", async () => {
    server.use(
      http.post("password", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await changePasswordWithoutLogin(data);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});
