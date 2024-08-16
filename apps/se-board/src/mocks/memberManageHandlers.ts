import { http, HttpResponse } from "msw";

const adminFetchMemberListHandler = http.get("/admin/accounts", () => {
  const response = {
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

  return HttpResponse.json(response);
});

const adminUpdateMemberHandler = http.put("/admin/accounts/1", () => {
  const response = {
    id: "string",
    password: "string",
    name: "string",
    nickname: "string",
    roles: [0],
  };

  return HttpResponse.json(response);
});

const adminDeleteMemberHandler = http.delete("/admin/accounts/1", () => {
  const response = {
    message: "string",
  };
  return HttpResponse.json(response);
});

const adminDeleteMembersHandler = http.delete("/admin/accounts", () => {
  const response = {
    message: "string",
  };
  return HttpResponse.json(response);
});

export const memberManageHandlers = [
  adminFetchMemberListHandler,
  adminUpdateMemberHandler,
  adminDeleteMemberHandler,
  adminDeleteMembersHandler,
];
