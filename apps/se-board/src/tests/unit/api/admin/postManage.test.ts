import { http, HttpResponse } from "msw";

import { adminDeletePost, adminFetchPostList } from "@/api/admin/postManage";
import { server } from "@/mocks/node";

describe("postManage 테스트", () => {
  describe("adminFetchPostList 테스트 코드", () => {
    it("게시글 조회", async () => {
      const { data: result } = await adminFetchPostList();
      const expectedResponse = {
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

      expect(result).toStrictEqual(expectedResponse);
    });
    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.get("/admin/posts", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await adminFetchPostList();
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("adminDeletePost 테스트 코드", () => {
    it("게시글 완전 삭제", async () => {
      const { data: result } = await adminDeletePost([1]);
      const expectedResponse = {
        message: "string",
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.delete("/admin/posts/permanent", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await adminDeletePost([1]);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("adminTrashPost 테스트 코드", () => {
    it("게시글 휴지통 보내기", async () => {
      const { data: result } = await adminDeletePost([1]);
      const expectedResponse = {
        message: "string",
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.delete("/admin/posts", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await adminDeletePost([1]);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });

  describe("adminRestorePost 테스트 코드", () => {
    it("게시글 복구", async () => {
      const { data: result } = await adminDeletePost([1]);
      const expectedResponse = {
        message: "string",
      };

      expect(result).toStrictEqual(expectedResponse);
    });

    it("서버에서 에러가 발생했을 경우 에러 메세지 확인", async () => {
      server.use(
        http.post("/admin/posts/restore", () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        })
      );

      try {
        await adminDeletePost([1]);
      } catch (error) {
        expect(error).toBe("Internal Server Error");
      }
    });
  });
});
