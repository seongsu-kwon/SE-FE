import { http, HttpResponse } from "msw";

const getDeletedAccountsHandler = http.get(
  "/admin/accounts",
  async ({ request }) => {
    const url = new URL(request.url);
    // not used searchParams
    // const status = url.searchParams.get("status");
    // const page = url.searchParams.get("page");
    // const perPage = url.searchParams.get("perPage");
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
          registeredDate: "2024-08-11T01:01:42.352Z",
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
  }
);

const restoreAccountsHandler = http.post("/admin/accounts/restore", () => {
  const response = {
    message: "string",
  };
  return HttpResponse.json(response);
});

const permanentlyDeleteAccountsHandler = http.delete(
  "/admin/accounts/permanent",
  () => {
    const response = {
      message: "string",
    };
    return HttpResponse.json(response);
  }
);

export const accountHandlers = [
  getDeletedAccountsHandler,
  restoreAccountsHandler,
  permanentlyDeleteAccountsHandler,
];
