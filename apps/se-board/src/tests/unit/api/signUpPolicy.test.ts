import { _axios, getJWTHeader } from "@/api/axiosInstance";
import { HTTP_METHODS } from "@/api/index";
import {
  deleteBannedId,
  deleteBannedNickname,
  getBannedIds,
  getBannedNickname,
  postBannedId,
  postBannedNickname,
} from "@/api/signUpPolicy";

jest.mock("@/api/axiosInstance", () => ({
  _axios: jest.fn(),
  getJWTHeader: jest.fn(),
}));

describe("계정 정책 API 호출", () => {
  const mockedAxios = _axios as jest.Mock;
  const mockedGetJWTHeader = getJWTHeader as jest.Mock;

  beforeEach(() => {
    mockedAxios.mockClear();
    mockedGetJWTHeader.mockClear();
    mockedGetJWTHeader.mockReturnValue({ Authorization: "Bearer mockToken" });
  });

  describe("getBannedNickname", () => {
    it("금지된 닉네임을 가져오기 위해 GET 요청을 보내야 합니다.", async () => {
      const mockResponse = { data: ["nickname1", "nickname2"] };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await getBannedNickname();

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: "/admin/accountPolicy/bannedNickname",
        method: HTTP_METHODS.GET,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인해야 합니다.", async () => {
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await getBannedNickname();
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("getBannedIds", () => {
    it("금지된 ID를 가져오기 위해 GET 요청을 보내야 합니다.", async () => {
      const mockResponse = { data: ["id1", "id2"] };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await getBannedIds();

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: "/admin/accountPolicy/bannedId",
        method: HTTP_METHODS.GET,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인해야 합니다.", async () => {
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await getBannedIds();
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("postBannedNickname", () => {
    it("금지된 닉네임을 추가하기 위해 POST 요청을 보내야 합니다.", async () => {
      const nickname = "newNickname";
      const mockResponse = { data: { success: true } };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await postBannedNickname(nickname);

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: "/admin/accountPolicy/bannedNickname",
        method: HTTP_METHODS.POST,
        data: { nickname },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인해야 합니다.", async () => {
      const nickname = "newNickname";
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await postBannedNickname(nickname);
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("postBannedId", () => {
    it("금지된 ID를 추가하기 위해 POST 요청을 보내야 합니다.", async () => {
      const bannedId = "newId";
      const mockResponse = { data: { success: true } };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await postBannedId(bannedId);

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: "/admin/accountPolicy/bannedId",
        method: HTTP_METHODS.POST,
        data: { bannedId },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인해야 합니다.", async () => {
      const bannedId = "newId";
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await postBannedId(bannedId);
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("deleteBannedNickname", () => {
    it("금지된 닉네임을 삭제하기 위해 DELETE 요청을 보내야 합니다.", async () => {
      const nickname = "oldNickname";
      const mockResponse = { data: { success: true } };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await deleteBannedNickname(nickname);

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: "/admin/accountPolicy/bannedNickname",
        method: HTTP_METHODS.DELETE,
        data: { nickname },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인해야 합니다.", async () => {
      const nickname = "oldNickname";
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await deleteBannedNickname(nickname);
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("deleteBannedId", () => {
    it("금지된 ID를 삭제하기 위해 DELETE 요청을 보내야 합니다.", async () => {
      const bannedId = "oldId";
      const mockResponse = { data: { success: true } };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await deleteBannedId(bannedId);

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: "/admin/accountPolicy/bannedId",
        method: HTTP_METHODS.DELETE,
        data: { bannedId },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인해야 합니다.", async () => {
      const bannedId = "oldId";
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await deleteBannedId(bannedId);
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });
});
