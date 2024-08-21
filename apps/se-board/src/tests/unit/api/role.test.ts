import { http, HttpResponse } from "msw";

import { deleteRole, getRoleInfos, postRole, putRole } from "@/api/Role";
import { server } from "@/mocks/node";

describe("역할 관리 API 호출", () => {
  describe("getRoleInfos", () => {
    it("페이지네이션을 적용하여 역할 정보를 GET 요청으로 가져와야 합니다.", async () => {
      const expectedResponse = {
        data: [
          { id: 1, name: "Admin" },
          { id: 2, name: "User" },
        ],
      };
      const result = await getRoleInfos(1, 10);

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.get("/admin/roles?page=1&perPage=10", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await getRoleInfos();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("deleteRole", () => {
    it("역할을 DELETE 요청으로 삭제해야 합니다.", async () => {
      const expectedResponse = { data: { success: true } };

      const result = await deleteRole(1);

      expect(result).toStrictEqual(expectedResponse.data);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.delete("/admin/roles/1", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await deleteRole(1);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("putRole", () => {
    it("역할을 PUT 요청으로 업데이트해야 합니다.", async () => {
      const mockResponse = { data: { success: true } };

      const result = await putRole(1, {
        name: "string",
        alias: "string",
        description: "string",
      });

      expect(result).toStrictEqual(mockResponse.data);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.put("/admin/roles/1", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await putRole(1, {
          name: "string",
          alias: "string",
          description: "string",
        });
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("postRole", () => {
    it("새로운 역할을 POST 요청으로 생성해야 합니다.", async () => {
      const mockResponse = { data: { success: true } };

      const result = await postRole({
        name: "string",
        alias: "string",
        description: "string",
      });

      expect(result).toStrictEqual(mockResponse.data);
    });

    it("서버에서 에러가 발생했을 경우 에러 메시지를 확인해야 합니다.", async () => {
      server.use(
        http.post("/admin/roles", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await postRole({
          name: "string",
          alias: "string",
          description: "string",
        });
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });
});
