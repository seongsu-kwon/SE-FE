import { AxiosResponse } from "axios";
import { http, HttpResponse } from "msw";

import { fetchBanners, fetchMainPageMenu } from "@/api/mainpage";
import { server } from "@/mocks/node";

describe("fetchMainPageMenu 테스트 코드", () => {
  it("정확한 URL과 헤더로 GET 요청을 보내고 res.data 확인", async () => {
    const properResult = [
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
    ];
    const result: AxiosResponse = await fetchMainPageMenu();
    expect(result.data).toStrictEqual(properResult);
  });
  it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
    server.use(
      http.get("/mainpage", () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await fetchMainPageMenu();
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});
describe("fetchBanners 테스트 코드", () => {
  it("정확한 URL과 헤더로 GET 요청을 보내고 res.data 확인", async () => {
    const properResult = [
      {
        fileMetaData: {
          fileMetaDataId: 0,
          originalFileName: "string",
          storedFileName: "string",
          url: "string",
        },
        bannerUrl: "string",
      },
    ];
    const result: AxiosResponse = await fetchBanners();
    expect(result.data).toStrictEqual(properResult);
  });
  it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
    server.use(
      http.get("/banners", () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await fetchBanners();
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});
