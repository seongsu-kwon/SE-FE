import { http, HttpResponse } from "msw";

import {
  adminDeleteMember,
  adminDeleteMembers,
  adminFetchMemberList,
  adminUpdateMember,
} from "@/api/admin/memberManage";
import { server } from "@/mocks/node";

describe("memberManage 테스트", () => {
  describe("adminFetchMemberList 테스트 코드", () => {
    it("정확한 URL과 헤더로 GET 요청을 보내고 res.data 확인", async () => {
      const { data: result } = await adminFetchMemberList({
        page: 0,
        perPage: 20,
      });
      const expectedResponse = {
        totalElements: 0,
        totalPages: 0,
        size: 0,
        content: [
          {
            accountId: 0,
            userId: 0,
            loginId: "string",
            name: "string",
            nickname: "string",
            registeredDate: "2024-08-08T06:32:36.847Z",
            roles: [
              {
                accountId: 0,
                roleId: 0,
                name: "string",
                description: "string",
                alias: "string",
                immutable: true,
              },
            ],
          },
        ],
        number: 0,
        sort: {
          empty: true,
          unsorted: true,
          sorted: true,
        },
        first: true,
        last: true,
        numberOfElements: 0,
        pageable: {
          pageNumber: 0,
          offset: 0,
          sort: {
            empty: true,
            unsorted: true,
            sorted: true,
          },
          unpaged: true,
          pageSize: 0,
          paged: true,
        },
        empty: true,
      };

      expect(result).toStrictEqual(expectedResponse);
    });
    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.get("/admin/accounts", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await adminFetchMemberList();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("adminUpdateMember 테스트 코드", () => {
    it("정확한 URL과 헤더로 PUT 요청을 보내고 res.data 확인", async () => {
      const { data: result } = await adminUpdateMember(1, {
        id: "string",
        password: "string",
        name: "string",
        nickname: "string",
        roles: [0],
      });
      const expectedResponse = {
        id: "string",
        password: "string",
        name: "string",
        nickname: "string",
        roles: [0],
      };

      expect(result).toStrictEqual(expectedResponse);
    });
    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.put("/admin/accounts/1", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await adminUpdateMember(1, {
          id: "string",
          password: "string",
          name: "string",
          nickname: "string",
          roles: [0],
        });
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("adminDeleteMember 테스트 코드", () => {
    it("정확한 URL과 헤더로 DELETE 요청을 보내고 res.data 확인", async () => {
      const { data: result } = await adminDeleteMember(1);
      expect(result).toStrictEqual({
        message: "string",
      });
    });
    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.delete("/admin/accounts/1", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await adminDeleteMember(1);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("adminDeleteMembers 테스트 코드", () => {
    it("정확한 URL과 헤더로 DELETE 요청을 보내고 res.data 확인", async () => {
      const { data: result } = await adminDeleteMembers([1, 2]);
      expect(result).toStrictEqual({
        message: "string",
      });
    });
    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.delete("/admin/accounts", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await adminDeleteMembers([1, 2]);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });
});
