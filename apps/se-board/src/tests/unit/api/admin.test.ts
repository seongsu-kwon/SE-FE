import { AdminMenuSettingData } from "@types";
import { http, HttpResponse } from "msw";

import {
  getAdminDashboard,
  getAdminMenus,
  putAdminMenuRollSetting,
} from "@/api/admin";
import { server } from "@/mocks/node";

describe("admin 테스트", () => {
  describe("getAdminMenus 테스트 코드", () => {
    it("대시보드 메뉴 조회", async () => {
      const result = await getAdminMenus();
      const expectedResponse = {
        menu: [
          {
            id: 0,
            name: "string",
            url: "string",
          },
        ],
        person: [
          {
            id: 0,
            name: "string",
            url: "string",
          },
        ],
        content: [
          {
            id: 0,
            name: "string",
            url: "string",
          },
        ],
        setting: [
          {
            id: 0,
            name: "string",
            url: "string",
          },
        ],
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.get("/admin/dashboard", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await getAdminMenus();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("getAdminDashboard 테스트 코드", () => {
    it("대시보드에 설정된 접근 권한을 조회", async () => {
      const result = await getAdminDashboard();
      const expectedResponse = {
        menu: [
          {
            menu: {
              id: 0,
              name: "string",
              url: "string",
            },
            option: {
              option: "string",
              roles: ["string"],
            },
          },
        ],
        person: [
          {
            menu: {
              id: 0,
              name: "string",
              url: "string",
            },
            option: {
              option: "string",
              roles: ["string"],
            },
          },
        ],
        content: [
          {
            menu: {
              id: 0,
              name: "string",
              url: "string",
            },
            option: {
              option: "string",
              roles: ["string"],
            },
          },
        ],
        setting: [
          {
            menu: {
              id: 0,
              name: "string",
              url: "string",
            },
            option: {
              option: "string",
              roles: ["string"],
            },
          },
        ],
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.get("/admin/dashboard", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await getAdminDashboard();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("putAdminMenuRollSetting 테스트 코드", () => {
    const mockParams: AdminMenuSettingData = {
      id: 1,
      option: {
        option: "string",
        roles: [1],
      },
    };

    it("대시보드 메뉴 접근 권한 수정", async () => {
      const result = await putAdminMenuRollSetting([mockParams]);
      const expectedResponse = {
        menus: [
          {
            id: 0,
            option: {
              option: "string",
              roles: [0],
            },
          },
        ],
      };

      expect(result).toStrictEqual(expectedResponse);
    });
    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.put("/admin/dashboard/setting/1", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );
      try {
        await putAdminMenuRollSetting([mockParams]);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });
});
