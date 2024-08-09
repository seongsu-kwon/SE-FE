import {
  clearSotredRefreshToken,
  getStoredAccessToken,
  getStoredRefreshToken,
  isMaintainLogin,
  removeBearerToken,
  setStoredAccessToken,
  setStoredRefreshToken,
} from "@/api/storage";

describe("인증 유틸리티 함수 테스트", () => {
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test("isMaintainLogin: localStorage에 refresh token이 있으면 true를 반환해야 합니다.", () => {
    localStorage.setItem("refresh_token", "sample_refresh_token");
    expect(isMaintainLogin()).toBe(true);
  });

  test("isMaintainLogin: localStorage에 refresh token이 없으면 false를 반환해야 합니다.", () => {
    expect(isMaintainLogin()).toBe(false);
  });

  test('removeBearerToken: "Bearer " 접두어를 제거해야 합니다.', () => {
    expect(removeBearerToken("Bearer sample_token")).toBe("sample_token");
    expect(removeBearerToken("sample_token")).toBe("sample_token");
  });

  test("getStoredRefreshToken: maintain login이 true일 때 localStorage에서 refresh token을 반환해야 합니다.", () => {
    localStorage.setItem("refresh_token", "sample_refresh_token");
    expect(getStoredRefreshToken()).toBe("sample_refresh_token");
  });

  test("getStoredRefreshToken: maintain login이 false일 때 sessionStorage에서 refresh token을 반환해야 합니다.", () => {
    sessionStorage.setItem("refresh_token", "sample_session_refresh_token");
    expect(getStoredRefreshToken()).toBe("sample_session_refresh_token");
  });

  test("getStoredAccessToken: maintain login이 true일 때 localStorage에서 access token을 반환해야 합니다.", () => {
    localStorage.setItem("refresh_token", "sample_refresh_token");
    localStorage.setItem("access_token", "sample_access_token");
    expect(getStoredAccessToken()).toBe("sample_access_token");
  });

  test("getStoredAccessToken: maintain login이 false일 때 sessionStorage에서 access token을 반환해야 합니다.", () => {
    sessionStorage.setItem("access_token", "sample_session_access_token");
    expect(getStoredAccessToken()).toBe("sample_session_access_token");
  });

  test("setStoredRefreshToken: maintain login이 true일 때 localStorage에 refresh token을 저장해야 합니다.", () => {
    setStoredRefreshToken("Bearer sample_refresh_token", true);
    expect(localStorage.getItem("refresh_token")).toBe("sample_refresh_token");
  });

  test("setStoredRefreshToken: maintain login이 false일 때 sessionStorage에 refresh token을 저장해야 합니다.", () => {
    setStoredRefreshToken("Bearer sample_refresh_token", false);
    expect(sessionStorage.getItem("refresh_token")).toBe(
      "sample_refresh_token"
    );
  });

  test("setStoredAccessToken: maintain login이 true일 때 localStorage에 access token을 저장해야 합니다.", () => {
    setStoredAccessToken("Bearer sample_access_token", true);
    expect(localStorage.getItem("access_token")).toBe("sample_access_token");
  });

  test("setStoredAccessToken: maintain login이 false일 때 sessionStorage에 access token을 저장해야 합니다.", () => {
    setStoredAccessToken("Bearer sample_access_token", false);
    expect(sessionStorage.getItem("access_token")).toBe("sample_access_token");
  });

  test("clearSotredRefreshToken: refresh token을 두 저장소(localStorage와 sessionStorage)에서 모두 제거해야 합니다.", () => {
    localStorage.setItem("refresh_token", "sample_refresh_token");
    sessionStorage.setItem("refresh_token", "sample_session_refresh_token");
    clearSotredRefreshToken();
    expect(localStorage.getItem("refresh_token")).toBeNull();
    expect(sessionStorage.getItem("refresh_token")).toBeNull();
  });
});
