import {
  ChangePasswordRequestDTO,
  checkAuthCodeDTO,
  LoginDTO,
  LoginFormFileds,
  OAuthSignupDTO,
  SignupDTO,
} from "@types";
import { http, HttpResponse } from "msw";

import {
  changePassword,
  checkAuthCode,
  checkDuplicatedNicname,
  checkKumohmailAuthCode,
  convertLoginFormFiledsToLoginDTO,
  fetchOAUthUserBasicInfo,
  kumohCertification,
  login,
  loginWithKakao,
  logout,
  oAuthSignup,
  reissueToken,
  requestEmailAuthCode,
  requestKumohmailAuthCode,
  signup,
  withdrawal,
} from "@/api/auth";
import { server } from "@/mocks/node";

describe("auth 테스트", () => {
  describe("requestEmailAuthCode 테스트 코드", () => {
    const params = "string";
    it("회원가입 이메일 인증 요청", async () => {
      const result = await requestEmailAuthCode(params);
      expect(result.statusText).toBe("OK");
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/email/auth", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await requestEmailAuthCode(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("checkAuthCode 테스트 코드", () => {
    const params: checkAuthCodeDTO = {
      email: "string",
      authToken: "string",
    };
    it("회원가입 이메일 인증 확인", async () => {
      const result = await checkAuthCode(params);
      expect(result.statusText).toBe("OK");
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/email/auth/confirm", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await checkAuthCode(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("signup 테스트 코드", () => {
    const params: SignupDTO = {
      id: "string",
      password: "string",
      nickname: "string",
      name: "string",
    };

    it("회원가입", async () => {
      const { data: result } = await signup(params);
      const expectedResponse = {
        accessToken: "string",
        refreshToken: "string",
      };
      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/account/form", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await signup(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("oauthSignup 테스트 코드", () => {
    const params: OAuthSignupDTO = {
      subject: "string",
      provider: "string",
      email: "string",
      password: "string",
      name: "string",
      nickname: "string",
    };

    it("OAuth 회원가입", async () => {
      const { data: result } = await oAuthSignup(params);
      const expectedResponse = {
        accessToken: "string",
        refreshToken: "string",
      };
      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/account/oauth", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await oAuthSignup(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("checkDuplicatedNickname 테스트 코드", () => {
    const params = "string";
    it("닉네임 중복 확인", async () => {
      const { data: result } = await checkDuplicatedNicname(params);
      const expectedResponse = {
        duplication: true,
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.get("/account/nickname", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await checkDuplicatedNicname(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("login 테스트 코드", () => {
    const params: LoginDTO = {
      username: "string",
      password: "string",
    };
    it("로그인", async () => {
      const { data: result } = await login(params);
      const expectedResponse = {
        accessToken: "string",
        refreshToken: "string",
      };
      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/formLogin", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await login(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("loginWithKakao 테스트 코드", () => {
    const params = "string";
    it("카카오 로그인", async () => {
      const { data: result } = await loginWithKakao(params);
      const expectedResponse = {
        accessToken: "string",
        refreshToken: "string",
      };
      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.get("/auth/kakao", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await loginWithKakao(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("convertLoginFormFieldsToLoginDTO 테스트 코드", () => {
    it("LoginDTO로 변환", () => {
      const data: LoginFormFileds = {
        id: "string",
        password: "string",
        maintainLogin: true,
      };
      const result = convertLoginFormFiledsToLoginDTO(data);
      const expectedResponse = {
        username: "string",
        password: "string",
      };
      expect(result).toStrictEqual(expectedResponse);
    });
  });

  describe("fetchOAUthUserBasicInfo 테스트 코드", () => {
    const params = "string";

    it("OAuth 회원 정보 조회", async () => {
      const { data: result } = await fetchOAUthUserBasicInfo(params);
      const expectedResponse = {
        id: "string",
        subject: "string",
        provider: "string",
        email: "string",
        name: "string",
        nickname: "string",
      };
      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.get("/register/oauth", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await fetchOAUthUserBasicInfo(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("logout 테스트 코드", () => {
    const params = "string";
    it("로그아웃", async () => {
      const { data: result } = await logout(params);
      const expectedResponse = {
        requiredRedirect: true,
        url: "string",
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/logoutProc", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await logout(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("reissueToken 테스트 코드", () => {
    const params = "string";
    it("토큰 재발행", async () => {
      const { data: result } = await reissueToken(params);
      const expectedResponse = {
        accessToken: "string",
        refreshToken: "string",
      };

      expect(result.refreshToken).toBe(expectedResponse.refreshToken);
      //   expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/refresh", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await reissueToken(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("changePassword 테스트 코드", () => {
    const params: ChangePasswordRequestDTO = {
      nowPassword: "string",
      newPassword: "string",
    };
    it("비밀번호 변경", async () => {
      const result = await changePassword(params);
      expect(result.statusText).toBe("OK");
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.put("/account/password", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await changePassword(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("requestKumohmailAtuhCode 테스트 코드", () => {
    const params = "string";
    it("금오 이메일 인증 요청", async () => {
      const result = await requestKumohmailAuthCode(params);
      expect(result.statusText).toBe("OK");
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/email/kumoh", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await requestKumohmailAuthCode(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("checkKumohmailAuthCode 테스트 코드", () => {
    const params: checkAuthCodeDTO = {
      email: "string",
      authToken: "string",
    };
    it("금오 이메일 인증 확인", async () => {
      const result = await checkKumohmailAuthCode(params);
      expect(result.statusText).toBe("OK");
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/email/kumoh/confirm", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await checkKumohmailAuthCode(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("kumohCertification 테스트 코드", () => {
    const params = "string";
    it("금오인 인증", async () => {
      const { data: result } = await kumohCertification(params);
      const expectedResponse = {
        email: "string",
        authorities: ["string"],
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/kumoh", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await kumohCertification(params);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("withdrawal 테스트 코드", () => {
    it("회원 탈퇴", async () => {
      const { data: result } = await withdrawal();
      const expectedResponse = {
        requiredRedirect: true,
        url: "string",
        accountId: 0,
        userId: 0,
        roles: ["string"],
        name: "string",
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.delete("/withdraw", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await withdrawal();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });
});
