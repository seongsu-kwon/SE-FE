import { AccountIds } from "@types";
import { http, HttpResponse } from "msw";

import {
  getDeletedAccounts,
  permanentlyDeleteAccounts,
  restoreAccounts,
} from "@/api/account";
import { server } from "@/mocks/node";

describe("account 테스트", () => {
  describe("getDeletedAccounts 테스트 코드", () => {
    it("삭제된 계정 목록 조회", async () => {
      const result = await getDeletedAccounts();
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
        await getDeletedAccounts();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("restoreAccounts 테스트 코드", () => {
    const mockAccountId: AccountIds = {
      accountIds: [1],
    };
    it("삭제된 계정 복구", async () => {
      const result = await restoreAccounts(mockAccountId);

      const expectedResponse = {
        message: "string",
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/admin/accounts/restore", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await restoreAccounts(mockAccountId);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("permanentlyDeleteAccounts 테스트 코드", () => {
    const mockAccountId: AccountIds = {
      accountIds: [1],
    };
    it("삭제된 계정 완전 삭제", async () => {
      const result = await permanentlyDeleteAccounts(mockAccountId);
      const expectedResponse = {
        message: "string",
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.delete("/admin/accounts/permanent", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await permanentlyDeleteAccounts(mockAccountId);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });
});
