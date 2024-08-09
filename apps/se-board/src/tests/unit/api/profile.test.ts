import { FetchUserProfileReqsponse, FetchUserSimpleInfoResponse } from "@types";

import { _axios, getJWTHeader } from "@/api/axiosInstance";
import { HTTP_METHODS } from "@/api/index";
import {
  fetchUserProfile,
  fetchUserSimpleInfo,
  updateUserProfile,
} from "@/api/profile";

jest.mock("@/api/axiosInstance", () => ({
  _axios: jest.fn(),
  getJWTHeader: jest.fn(),
}));

describe("프로필 API 호출", () => {
  const mockedAxios = _axios as jest.Mock;
  const mockedGetJWTHeader = getJWTHeader as jest.Mock;

  beforeEach(() => {
    mockedAxios.mockClear();
    mockedGetJWTHeader.mockClear();
    mockedGetJWTHeader.mockReturnValue({ Authorization: "Bearer mockToken" });
  });

  describe("fetchUserSimpleInfo", () => {
    it("사용자 간단 정보 요청을 GET으로 수행해야 합니다.", async () => {
      const mockResponse: FetchUserSimpleInfoResponse = {
        nickname: "John Doe",
        email: "email@gamil.com",
        userId: 123,
        roles: ["USER"],
      };
      mockedAxios.mockResolvedValue({ data: mockResponse });

      const result = await fetchUserSimpleInfo();

      expect(mockedAxios).toHaveBeenCalledWith({
        url: "mypage",
        method: HTTP_METHODS.GET,
        headers: { Authorization: "Bearer mockToken" },
      });
      expect(result.data).toEqual(mockResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await fetchUserSimpleInfo();
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("fetchUserProfile", () => {
    it("사용자 ID로 사용자 프로필 요청을 GET으로 수행해야 합니다.", async () => {
      const userId = "456";
      const mockResponse: FetchUserProfileReqsponse = {
        nickname: "John Doe",
        bookmarkCount: 1,
        postCount: 1,
        commentCount: 1,
      };
      mockedAxios.mockResolvedValue({ data: mockResponse });

      const result = await fetchUserProfile(userId);

      expect(mockedAxios).toHaveBeenCalledWith({
        url: `profile/${userId}`,
        method: HTTP_METHODS.GET,
        headers: { Authorization: "Bearer mockToken" },
      });
      expect(result.data).toEqual(mockResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await fetchUserProfile("456");
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("updateUserProfile", () => {
    it("사용자 프로필을 PUT으로 업데이트해야 합니다.", async () => {
      const updateData = { nickname: "NewNickname" };
      const mockResponse = { success: true };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await updateUserProfile(updateData);

      expect(mockedAxios).toHaveBeenCalledWith({
        url: "mypage/info",
        method: HTTP_METHODS.PUT,
        headers: { Authorization: "Bearer mockToken" },
        data: updateData,
      });
      expect(result).toEqual(mockResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await updateUserProfile({ nickname: "NewNickname" });
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });
});
