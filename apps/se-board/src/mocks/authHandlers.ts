import { http, HttpResponse } from "msw";

const requestEmailAuthCodeHandler = http.post("/email/auth", () => {
  return new HttpResponse("OK", {
    status: 200,
  });
});

const checkAuthCodeHandler = http.post("/email/auth/confirm", () => {
  return new HttpResponse("OK", {
    status: 200,
  });
});

export const siginupHandler = http.post("/account/form", () => {
  const response = {
    accessToken: "string",
    refreshToken: "string",
  };
  return HttpResponse.json(response);
});

const oAuthSignupHandler = http.post("/account/oauth", () => {
  const response = {
    accessToken: "string",
    refreshToken: "string",
  };
  return HttpResponse.json(response);
});

const checkDuplicatedNicnameHandler = http.post("/account/nickname", () => {
  const response = {
    duplication: true,
  };

  return HttpResponse.json(response);
});

const loginHandler = http.post("/formLogin", () => {
  const response = {
    accessToken: "string",
    refreshToken: "string",
  };
  return HttpResponse.json(response);
});

const loginWithKakaoHandler = http.get("/auth/kakao", () => {
  const response = {
    accessToken: "string",
    refreshToken: "string",
  };
  return HttpResponse.json(response);
});

const fetchOAUthUserBasicInfoHandler = http.get("/register/oauth", () => {
  const response = {
    id: "string",
    subject: "string",
    provider: "string",
    email: "string",
    name: "string",
    nickname: "string",
  };

  return HttpResponse.json(response);
});

const logoutHandler = http.post("/logoutProc", () => {
  const response = {
    requiredRedirect: true,
    url: "string",
  };
  return HttpResponse.json(response);
});

const reissueTokenHandler = http.post("/refresh", () => {
  const response = {
    accessToken: "string",
    refreshToken: "string",
  };

  return HttpResponse.json(response);
});

const changePasswordHandler = http.post("/mypage/password", () => {
  return new HttpResponse("OK", {
    status: 200,
  });
});

const requestKumohmailAuthCodeHandler = http.post("/email/kumoh", () => {
  return new HttpResponse("OK", {
    status: 200,
  });
});

const checkKumohmailAuthCodeHandler = http.post("/email/kumoh/confirm", () => {
  return new HttpResponse("OK", {
    status: 200,
  });
});

const kumohCertificationHandler = http.post("/kumoh", ({ params }) => {
  const response = {
    email: "string",
    authorities: ["string"],
  };
  return HttpResponse.json(response);
});

const withdrawalHandler = http.delete("/withdraw", () => {
  const response = {
    requiredRedirect: true,
    url: "string",
    accountId: 0,
    userId: 0,
    roles: ["string"],
    name: "string",
  };

  return HttpResponse.json(response);
});

export const authHandlers = [
  requestEmailAuthCodeHandler,
  checkAuthCodeHandler,
  siginupHandler,
  oAuthSignupHandler,
  checkDuplicatedNicnameHandler,
  loginHandler,
  loginWithKakaoHandler,
  fetchOAUthUserBasicInfoHandler,
  logoutHandler,
  reissueTokenHandler,
  changePasswordHandler,
  requestKumohmailAuthCodeHandler,
  checkKumohmailAuthCodeHandler,
  kumohCertificationHandler,
  withdrawalHandler,
];
