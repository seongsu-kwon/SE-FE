import { http, HttpResponse } from "msw";

export const postHandlers = [
  http.get("/posts", () => {
    return HttpResponse.json({
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
          author: {
            userId: 0,
            name: "string",
          },
          views: 0,
          createdAt: "2024-08-12T04:29:10.549Z",
          modifiedAt: "2024-08-12T04:29:10.549Z",
          hasAttachment: true,
          commentSize: 0,
          pined: true,
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
    });
  }),
  http.get("/posts/pined", () => {
    return HttpResponse.json([
      {
        postId: 0,
        title: "string",
        category: {
          categoryId: 0,
          name: "string",
        },
        author: {
          userId: 0,
          name: "string",
        },
        views: 0,
        createdAt: "2024-08-12T04:30:08.789Z",
        modifiedAt: "2024-08-12T04:30:08.789Z",
        hasAttachment: true,
        commentSize: 0,
        pined: true,
      },
    ]);
  }),
  http.get("/search/posts", () => {
    return HttpResponse.json({
      content: [
        {
          postId: 1,
          title: "첫 번째 게시물",
          category: {
            categoryId: 101,
            categoryName: "기술",
          },
          author: {
            userId: 201,
            username: "작성자1",
          },
          views: 150,
          createdAt: "2023-08-01T10:00:00",
          modifiedAt: "2023-08-10T12:00:00",
          hasAttachment: true,
          commentSize: 5,
          pined: false,
        },
        {
          postId: 2,
          title: "두 번째 게시물",
          category: {
            categoryId: 102,
            categoryName: "생활",
          },
          author: {
            userId: 202,
            username: "작성자2",
          },
          views: 200,
          createdAt: "2023-08-02T11:00:00",
          modifiedAt: "2023-08-11T13:00:00",
          hasAttachment: false,
          commentSize: 3,
          pined: true,
        },
      ],
      totalPages: 10,
      totalElements: 100,
      size: 10,
      number: 0,
      numberOfElements: 2,
      first: true,
      last: false,
      empty: false,
    });
  }),
  http.get("/posts/:postId", () => {
    return HttpResponse.json({
      postId: 0,
      title: "string",
      contents: "string",
      category: {
        categoryId: 0,
        name: "string",
      },
      author: {
        userId: 0,
        name: "string",
      },
      views: 0,
      createdAt: "2024-08-12T05:20:17.916Z",
      modifiedAt: "2024-08-12T05:20:17.916Z",
      exposeType: "string",
      attachments: {
        fileMetaDataList: [
          {
            fileMetaDataId: 0,
            originalFileName: "string",
            storedFileName: "string",
            url: "string",
          },
        ],
      },
      isEditable: true,
      isBookmarked: true,
      isPined: true,
    });
  }),
  http.post("/posts", () => {
    return HttpResponse.json({
      id: 0,
      message: "string",
    });
  }),
  http.put("/posts/:postId", () => {
    return HttpResponse.json({
      id: 0,
      message: "string",
    });
  }),
  http.post("/posts/:postId/bookmark", () => {
    return HttpResponse.json({
      message: "즐겨찾기 등록 완료",
    });
  }),
  http.delete("/posts/:postId/bookmark", () => {
    return HttpResponse.json({
      message: "즐겨찾기 해제 완료",
    });
  }),
  http.delete("/posts/:postId", () => {
    return HttpResponse.json({
      id: 0,
      message: "게시글 삭제 성공",
    });
  }),
  http.post("/posts/:postId/auth", () => {
    return HttpResponse.json({
      postId: 0,
      title: "string",
      contents: "string",
      category: {
        categoryId: 0,
        name: "string",
      },
      author: {
        userId: 0,
        name: "string",
      },
      views: 0,
      createdAt: "2024-08-12T05:20:17.916Z",
      modifiedAt: "2024-08-12T05:20:17.916Z",
      exposeType: "string",
      attachments: {
        fileMetaDataList: [
          {
            fileMetaDataId: 0,
            originalFileName: "string",
            storedFileName: "string",
            url: "string",
          },
        ],
      },
      isEditable: true,
      isBookmarked: true,
      isPined: true,
    });
  }),
  http.get("/profile/:loginId/posts", () => {
    return HttpResponse.json({
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
          author: {
            userId: 0,
            name: "string",
          },
          views: 0,
          createdAt: "2024-08-12T05:39:38.531Z",
          modifiedAt: "2024-08-12T05:39:38.531Z",
          hasAttachment: true,
          commentSize: 0,
          pined: true,
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
    });
  }),
  http.get("/profile/:loginId/comments", () => {
    return HttpResponse.json({
      totalElements: 0,
      totalPages: 0,
      size: 0,
      content: [
        {
          commentId: 0,
          superCommentId: 0,
          tagCommentId: 0,
          postId: 0,
          author: {
            userId: 0,
            name: "string",
          },
          contents: "string",
          createdAt: "2024-08-12T05:40:33.112Z",
          modifiedAt: "2024-08-12T05:40:33.112Z",
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
    });
  }),
  http.get("/profile/:userId/bookmarks", () => {
    return HttpResponse.json({
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
          author: {
            userId: 0,
            name: "string",
          },
          views: 0,
          createdAt: "2024-08-12T05:41:45.032Z",
          modifiedAt: "2024-08-12T05:41:45.032Z",
          hasAttachment: true,
          commentSize: 0,
          pined: true,
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
    });
  }),
  http.get("/admin/posts/deleted?page=:page&perPage=:perPage", () => {
    return HttpResponse.json({
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
          createdAt: "2024-08-12T05:43:26.548Z",
          modifiedAt: "2024-08-12T05:43:26.548Z",
          hasAttachment: true,
          exposeOption: "string",
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
    });
  }),
  http.post("/admin/posts/restore", () => {
    return HttpResponse.json({
      message: "string",
    });
  }),
  http.delete("/admin/posts/permanent", () => {
    return HttpResponse.json({
      message: "string",
    });
  }),
  http.post("posts/:postId/report", () => {
    return HttpResponse.json({
      message: "string",
    });
  }),
];
