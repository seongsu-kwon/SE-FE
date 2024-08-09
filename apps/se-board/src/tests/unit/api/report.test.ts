import { ReportThreshold } from "@types";

import { _axios, getJWTHeader } from "@/api/axiosInstance";
import { HTTP_METHODS } from "@/api/index";
import { getReportThreshold, postReportThreshold } from "@/api/report";

jest.mock("@/api/axiosInstance", () => ({
  _axios: jest.fn(),
  getJWTHeader: jest.fn(),
}));

describe("Report Threshold API calls", () => {
  const mockedAxios = _axios as jest.Mock;
  const mockedGetJWTHeader = getJWTHeader as jest.Mock;

  beforeEach(() => {
    mockedAxios.mockClear();
    mockedGetJWTHeader.mockClear();
    mockedGetJWTHeader.mockReturnValue({ Authorization: "Bearer mockToken" });
  });

  describe("getReportThreshold", () => {
    it("정확한 URL과 헤더로 GET 요청을 보내고 데이터를 확인합니다.", async () => {
      const mockResponse = { threshold: 10 };
      mockedAxios.mockResolvedValue({ data: mockResponse });

      const result = await getReportThreshold();

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: "/admin/report/threshold",
        method: HTTP_METHODS.GET,
      });
      expect(result).toEqual(mockResponse);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인합니다.", async () => {
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await getReportThreshold();
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("postReportThreshold", () => {
    it("정확한 URL과 헤더로 POST 요청을 보내고 성공을 확인합니다.", async () => {
      const thresholdData: ReportThreshold = {
        postThreshold: 1,
        commentThreshold: 2,
      };
      const mockResponse = { success: true };
      mockedAxios.mockResolvedValue({ data: mockResponse });

      const result = await postReportThreshold(thresholdData);

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: "/admin/report/threshold",
        method: HTTP_METHODS.POST,
        data: thresholdData,
      });
      expect(result.data).toEqual(mockResponse);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인합니다.", async () => {
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await postReportThreshold({ postThreshold: 1, commentThreshold: 2 });
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });
});
