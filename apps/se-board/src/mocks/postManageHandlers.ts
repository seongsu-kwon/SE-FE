import { http, HttpResponse } from "msw";

const adminFetchPostListHandler = http.get("/admin/posts", () => {
  const response = {
    totalElements: 0,
    totalPages: 0,
    size: 0,
    content: [
      {
        postId: 0,
        title: "string",
        category: {
          categoryId: 0,
          name: "string",
        },
        menu: {
          menuId: 0,
          name: "string",
          urlId: "string",
        },
        author: {
          userId: 0,
          name: "string",
        },
        views: 0,
        createdAt: "2024-08-11T00:40:57.081Z",
        modifiedAt: "2024-08-11T00:40:57.081Z",
        hasAttachment: true,
        exposeOption: "string",
        isReported: true,
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

const adminDeletePostHandler = http.delete("/admin/posts/permanent", () => {
  const response = {
    message: "string",
  };
  return HttpResponse.json(response);
});

const adminTrashPostHandler = http.delete("/admin/posts", () => {
  const response = {
    message: "string",
  };
  return HttpResponse.json(response);
});

const adminRestorePostHandler = http.post("/admin/posts/restore", () => {
  const response = {
    message: "string",
  };
  return HttpResponse.json(response);
});

export const postManageHandlers = [
  adminFetchPostListHandler,
  adminDeletePostHandler,
  adminTrashPostHandler,
  adminRestorePostHandler,
];
