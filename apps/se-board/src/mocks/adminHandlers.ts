import { http, HttpResponse } from "msw";

const getAdminMenusHandler = http.get("/admin/dashboard", () => {
  const response = {
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
  return HttpResponse.json(response);
});
const getAdminDashboardHandler = http.get("/admin/dashboard/setting", () => {
  const response = {
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
  return HttpResponse.json(response);
});
const putAdminMenuRollSettingHandler = http.put(
  "/admin/dashboard/setting",
  () => {
    const response = {
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
    return HttpResponse.json(response);
  }
);

export const adminHandlers = [
  getAdminMenusHandler,
  getAdminDashboardHandler,
  putAdminMenuRollSettingHandler,
];
