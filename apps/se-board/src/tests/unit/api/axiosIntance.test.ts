import { http, HttpResponse } from "msw";

import { _axios, getJWTHeader } from "@/api/axiosInstance";
import { HTTP_METHODS } from "@/api/index";
import { getStoredAccessToken } from "@/api/storage";
import { server } from "@/mocks/node";

jest.mock("@/api/storage", () => ({
  getStoredAccessToken: jest.fn(),
  instance: jest.fn(),
}));

describe("axiosInstance 테스트", () => {
  beforeEach(() => {
    (getStoredAccessToken as jest.Mock).mockClear();
  });
  describe("getJWTHeader 테스트", () => {
    it("AccessToken 이 있을 때 JWT 토큰을 반환", () => {
      const mockToken = "mockToken";

      (getStoredAccessToken as jest.Mock).mockReturnValue(mockToken);

      const result = getJWTHeader();

      expect(result).toEqual({ Authorization: `Bearer ${mockToken}` });
    });

    it("AccessToken 이 없을 때 빈 객체를 반환", () => {
      (getStoredAccessToken as jest.Mock).mockReturnValue(null);

      const result = getJWTHeader();

      expect(result).toEqual({ Authorization: "" });
    });
  });

  describe("_axios 테스트", () => {
    it("GET 요청", async () => {
      server.use(
        http.get("/mock", () => {
          return new HttpResponse("OK", { status: 200 });
        })
      );

      const result = await _axios({ url: "/mock", method: HTTP_METHODS.GET });

      expect(result.status).toBe(200);
    });

    it("POST 요청", async () => {
      server.use(
        http.post("/mock", () => {
          return new HttpResponse("OK", { status: 200 });
        })
      );

      const result = await _axios({ url: "/mock", method: HTTP_METHODS.POST });

      expect(result.status).toBe(200);
    });

    it("PUT 요청", async () => {
      server.use(
        http.put("/mock", () => {
          return new HttpResponse("OK", { status: 200 });
        })
      );

      const result = await _axios({ url: "/mock", method: HTTP_METHODS.PUT });

      expect(result.status).toBe(200);
    });

    it("DELETE 요청", async () => {
      server.use(
        http.delete("/mock", () => {
          return new HttpResponse("OK", { status: 200 });
        })
      );

      const result = await _axios({
        url: "/mock",
        method: HTTP_METHODS.DELETE,
      });

      expect(result.status).toBe(200);
    });
  });
});
