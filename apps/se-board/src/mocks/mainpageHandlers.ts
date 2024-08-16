import { http, HttpResponse } from "msw";

export const mainpageHandlers = [
  http.get("/mainPage", () => {
    return HttpResponse.json([
      {
        posts: {
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
              createdAt: "2024-08-08T05:37:21.620Z",
              modifiedAt: "2024-08-08T05:37:21.620Z",
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
        },
        menuName: "string",
        urlId: "string",
      },
    ]);
  }),
  http.get("/banners", () => {
    return HttpResponse.json([
      {
        fileMetaData: {
          fileMetaDataId: 0,
          originalFileName: "string",
          storedFileName: "string",
          url: "string",
        },
        bannerUrl: "string",
      },
    ]);
  }),
];
