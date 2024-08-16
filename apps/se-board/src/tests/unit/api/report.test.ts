import { ReportThreshold } from "@types";
import { http, HttpResponse } from "msw";

import { getReportThreshold, postReportThreshold } from "@/api/report";
import { server } from "@/mocks/node";

describe("Report Threshold API calls", () => {
  describe("getReportThreshold", () => {
    it("정확한 URL과 헤더로 GET 요청을 보내고 데이터를 확인합니다.", async () => {
      const expectedResponse = { threshold: 0 };

      const result = await getReportThreshold();

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.get("/admin/report/threshold", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await getReportThreshold();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("postReportThreshold", () => {
    it("정확한 URL과 헤더로 POST 요청을 보내고 성공을 확인합니다.", async () => {
      const thresholdData: ReportThreshold = {
        postThreshold: 1,
        commentThreshold: 2,
      };
      const expectedResponse = { success: true };

      const result = await postReportThreshold(thresholdData);

      expect(result.data).toStrictEqual(expectedResponse);
    });
    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.post("/admin/report/threshold", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await postReportThreshold({
          postThreshold: 1,
          commentThreshold: 2,
        });
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });
});
