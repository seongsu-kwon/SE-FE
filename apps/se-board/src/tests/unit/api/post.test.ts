import {
  FetchPostListParams,
  PostCreate,
  PostListItem,
  PostListItemDTO,
  PostPut,
  SearchPostParams,
} from "@types";
import { http, HttpResponse } from "msw";

import {
  bookmarkDelete,
  bookmarkPost,
  convertPostListItemDTOToPostListItem,
  deletePost,
  fetchBookmarkListByLoginId,
  fetchCommentListByLoginId,
  fetchGetPost,
  fetchPinedPostList,
  fetchPostList,
  fetchPostListByLoginId,
  getDeletedPosts,
  permanentlyDeletePosts,
  postPost,
  putPost,
  reportPost,
  restorePosts,
  searchPost,
  secretPost,
} from "@/api/post";
import { server } from "@/mocks/node";

describe("fetchPostList 테스트 코드", () => {
  const fetchPostListParams: FetchPostListParams = {
    categoryId: 0,
    page: 1,
    perPage: 10,
  };
  it("카테고리, 페이징 정보를 전달하여 게시글 목록 조회", async () => {
    const properResult = {
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
    };
    const result = await fetchPostList(fetchPostListParams);
    expect(result.data).toStrictEqual(properResult);
  });
  it("게시글 목록 조회에 실패", async () => {
    server.use(
      http.get("/posts", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await fetchPostList(fetchPostListParams);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("fetchPinedPostList 테스트 코드", () => {
  const categoryId = 1;
  it("공지 게시글 조회", async () => {
    const properResult = [
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
    ];
    const result = await fetchPinedPostList(categoryId);
    expect(result.data).toStrictEqual(properResult);
  });
  it("공지 게시글 조회 실패", async () => {
    server.use(
      http.get("/posts/pined", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await fetchPinedPostList(categoryId);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("searchPost 테스트 코드", () => {
  const searchPostParams: SearchPostParams = {
    categoryId: 1,
    page: 1,
    perPage: 10,
    searchOption: "searchOption",
    query: "searchQuery",
  };
  it("카테고리 id 및 옵션으로 게시글 검색", async () => {
    const properResult = {
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
    };
    const result = await searchPost(searchPostParams);
    expect(result.data).toStrictEqual(properResult);
  });
  it("게시글 검색에 실패", async () => {
    server.use(
      http.get("/search/posts", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await searchPost(searchPostParams);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("convertPostListItemDOTToPostListItem 테스트 코드", () => {
  const postListItemDTO: PostListItemDTO = {
    postId: 1,
    title: "Title",
    author: {
      userId: "userId",
      name: "Author Name",
    },
    views: 1,
    category: {
      categoryId: 1,
      name: "Category Name",
    },
    createdAt: "2023-08-01T00:00:00",
    modifiedAt: "2023-08-01T00:00:00",
    hasAttachment: false,
    commentSize: 10,
    pined: false,
  };
  it("postListItemDTO를 postListItem으로 변환하는데 성공", async () => {
    const properResult: PostListItem = {
      postId: 1,
      title: "Title",
      author: {
        userId: "userId",
        name: "Author Name",
      },
      views: 1,
      category: {
        categoryId: 1,
        name: "Category Name",
      },
      createdDateTime: "2023-08-01T00:00:00",
      modifiedDateTime: "2023-08-01T00:00:00",
      hasAttachment: false,
      commentSize: 10,
      pined: false,
      number: 0,
    };
    const result = await convertPostListItemDTOToPostListItem(postListItemDTO);
    expect(result).toStrictEqual(properResult);
  });
});

describe("fetchGetPost 테스트 코드", () => {
  const postId = "12";
  it("게시글 상세 조회", async () => {
    const properResult = {
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
    };
    const result = await fetchGetPost(postId);
    expect(result).toStrictEqual(properResult);
  });
  it("게시글 상세조회 실패", async () => {
    server.use(
      http.get("/posts/:postId", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await fetchGetPost(postId);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("postPost 테스트 코드", () => {
  const post: PostCreate = {
    title: "Title",
    contents: "contents",
    categoryId: 1,
    pined: false,
    exposeOption: {
      name: "string",
    },
    attachmentIds: [],
    anonymous: false,
    isSyncOldVersion: false,
  };
  it("게시글 작성", async () => {
    const result = await postPost(post);
    expect(result).toStrictEqual({
      id: 0,
      message: "string",
    });
  });
  it("게시글 작성 실패", async () => {
    server.use(
      http.post("/posts", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await postPost(post);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("putPost 테스트 코드", () => {
  const postId = 1;
  const data: PostPut = {
    title: "title",
    contents: "string",
    categoryId: 1,
    pined: false,
    exposeOption: {
      name: "string",
    },
    attachmentIds: [],
  };
  it("게시글 수정", async () => {
    const result = await putPost(postId, data);
    expect(result).toStrictEqual({
      id: 0,
      message: "string",
    });
  });
  it("게시글 수정 실패", async () => {
    server.use(
      http.get("/posts/:postId", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await putPost(postId, data);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("bookmarkPost 테스트 코드", () => {
  const postId = 1;
  it("게시글을 즐겨찾기로 등록", async () => {
    const result = await bookmarkPost(postId);
    expect(result.data).toStrictEqual({
      message: "즐겨찾기 등록 완료",
    });
  });
  it("게시글을 즐쳐갖기로 등록에 실패", async () => {
    server.use(
      http.post("/posts/:postId/bookmark", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await bookmarkPost(postId);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("bookmarkDelete 테스트 코드", () => {
  const postId = 1;
  it("게시글 북마크 해제", async () => {
    const result = await bookmarkDelete(postId);
    expect(result.data).toStrictEqual({
      message: "즐겨찾기 해제 완료",
    });
  });
  it("게시글 북마크 해제 실패", async () => {
    server.use(
      http.delete("/posts/:postId/bookmark", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await bookmarkDelete(postId);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("deletePost 테스트 코드", () => {
  const postId = 1;
  it("게시글 삭제", async () => {
    const result = await deletePost(postId);
    expect(result.data).toStrictEqual({
      id: 0,
      message: "게시글 삭제 성공",
    });
  });
  it("게시글 삭제 실패", async () => {
    server.use(
      http.delete("/posts/:postId", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await deletePost(postId);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("secretPost 테스트 코드", () => {
  const postId = 1;
  const password = "1234";
  it("비밀 게시글 상세 조회", async () => {
    const result = await secretPost(postId, password);
    expect(result).toStrictEqual({
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
  });
  it("비밀 게시글 상세 조회 실패", async () => {
    server.use(
      http.post("/posts/:postId/auth", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await secretPost(postId, password);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("fetchPostListByLoginId 테스트 코드", () => {
  const data = {
    loginId: "id",
    page: 1,
    perPage: 10,
  };
  it("사용자가 작성한 게시글 조회", async () => {
    const properResult = {
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
    };
    const result = await fetchPostListByLoginId(data);
    expect(result.data).toStrictEqual(properResult);
  });
  it("사용자가 작성한 게시글 조회 실패", async () => {
    server.use(
      http.get("/profile/:loginId/posts", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await fetchPostListByLoginId(data);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("fetchCommentListByLoginId 테스트 코드", () => {
  const data = {
    loginId: "id",
    page: 1,
    perPage: 10,
  };
  it("사용자가 작성한 댓글 목록 조회", async () => {
    const properResult = {
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
    };
    const result = await fetchCommentListByLoginId(data);
    expect(result.data).toStrictEqual(properResult);
  });
  it("사용자가 작성한 댓글 목록 조회 실패", async () => {
    server.use(
      http.get("/profile/:loginId/comments", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await fetchCommentListByLoginId(data);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("fetchBookmarkListByLoginId 테스트 코드", () => {
  const data = {
    userId: 1234,
    page: 1,
    perPage: 10,
  };
  it("내 북마크 목록 조회", async () => {
    const properResult = {
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
    };
    const result = await fetchBookmarkListByLoginId(data);
    expect(result.data).toStrictEqual(properResult);
  });
  it("내 북마크 목록 조회 실패", async () => {
    server.use(
      http.get("/profile/:userId/bookmarks", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await fetchBookmarkListByLoginId(data);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("getDeletedPosts 테스트 코드", () => {
  const page: number = 1;
  const perPage: number = 10;
  it("휴지통 게시글 조회", async () => {
    const properResult = {
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
    };
    const result = await getDeletedPosts(page, perPage);
    expect(result).toStrictEqual(properResult);
  });
  it("휴지통 게시글 조회 실패", async () => {
    server.use(
      http.get(
        `/admin/posts/deleted?page=${page}&perPage=${perPage}`,
        async () => {
          return new HttpResponse("Internal Server Error", {
            status: 500,
          });
        }
      )
    );
    try {
      await getDeletedPosts(page, perPage);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("restorePosts 테스트 코드", () => {
  const data = {
    postIds: [1, 2, 3],
  };
  it("게시글 복구", async () => {
    const properResult = {
      message: "string",
    };
    const result = await restorePosts(data);
    expect(result).toStrictEqual(properResult);
  });
  it("게시글 복구 실패", async () => {
    server.use(
      http.post("/admin/posts/restore", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await restorePosts(data);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("permanentlyDeletePosts 테스트 코드", () => {
  const postIds: number[] = [1, 2, 3];
  it("게시글 완전 삭제", async () => {
    const properResult = {
      message: "string",
    };
    const result = await permanentlyDeletePosts(postIds);
    expect(result).toStrictEqual(properResult);
  });
  it("게시글 완전 삭제 실패", async () => {
    server.use(
      http.delete("/admin/posts/permanent", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await permanentlyDeletePosts(postIds);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("reportPost 테스트 코드", () => {
  const postId: number = 1;
  it("게시글 신고", async () => {
    const properResult = {
      message: "string",
    };
    const result = await reportPost(postId);
    expect(result).toStrictEqual(properResult);
  });
  it("게시글 신고 실패", async () => {
    server.use(
      http.post("posts/:postId/report", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await reportPost(postId);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});
