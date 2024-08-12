import { PostMenuInfo } from "@types";
import { AxiosResponse } from "axios";
import { http, HttpResponse } from "msw";

import {
  deleteCategory,
  fetchMenuList,
  getCategory,
  getMainPageMenus,
  getMenuList,
  getSelectedMainPageMenus,
  postAddMenuOrCategory,
  postMoveBoardMenu,
  postMoveCategory,
  putCategory,
  putGroupSubMenu,
  putMainPageMenus,
} from "@/api/menu";
import { server } from "@/mocks/node";

describe("fetchMenuList 테스트 코드", () => {
  it("메뉴목록 조회", async () => {
    const properResult = [
      {
        menuId: 0,
        name: "string",
        urlId: "string",
        externalUrl: "string",
        type: "string",
      },
    ];
    const result: AxiosResponse = await fetchMenuList();
    expect(result.data).toStrictEqual(properResult);
  });
  it("메뉴목록 조회 실패", async () => {
    server.use(
      http.get("/menu", () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await fetchMenuList();
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("getMenuList 테스트 코드", () => {
  it("관리자가 카테고리를 조회", async () => {
    const properResult = [
      {
        menuId: 0,
        name: "string",
        urlId: "string",
      },
    ];
    const result = await getMenuList();
    expect(result).toStrictEqual(properResult);
  });
  it("관리자가 카테고리 조회를 실패", async () => {
    server.use(
      http.get("/admin/menu", () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await getMenuList();
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("getCategory 테스트 코드", () => {
  it("카테고리 정보를 상세하게 조회", async () => {
    const categoryId = 1;
    const properResult = {
      menuId: 0,
      name: "string",
      urlId: "string",
    };
    const result = await getCategory(categoryId);
    expect(result).toStrictEqual(properResult);
  });
  it("카테고리 정보를 조회하는데 실패", async () => {
    const categoryId = 1;
    server.use(
      http.get("/admin/menu/:categoryId", () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await getCategory(categoryId);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("getMainPageMenus 테스트 코드", () => {
  it("메인 페이지에 등록 가능한 메뉴 목록을 조회", async () => {
    const properResult = [
      {
        categoryId: 0,
        name: "string",
        description: "string",
        url: "string",
      },
    ];
    const result = await getMainPageMenus();
    expect(result).toStrictEqual(properResult);
  });
  it("메인 메인페이지에 등록 가능한 메뉴 목록을 조회 실패", async () => {
    server.use(
      http.get("admin/mainPageMenus/all", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await getMainPageMenus();
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("getSelectedMainPageMenus 테스트 코드", () => {
  it("메인 페이지에 보여줄 메뉴로 설정된 정보를 조회", async () => {
    const properResult = [
      {
        id: 0,
        menuId: 0,
        name: "string",
        url: "string",
        description: "string",
      },
    ];
    const result = await getSelectedMainPageMenus();
    expect(result).toStrictEqual(properResult);
  });
  it("메인 페이지에 보여줄 메뉴로 설정된 정보를 조회 실패", async () => {
    server.use(
      http.get("admin/mainPageMenus", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await getSelectedMainPageMenus();
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("putMainPageMenus 테스트 코드", () => {
  it("메인 페이지에 보여줄 메뉴 업데이트", async () => {
    const menuIds: number[] = [1, 2, 3, 4, 5];
    const result = await putMainPageMenus(menuIds);
    expect(result).toStrictEqual({ status: 200 });
  });
  it("메인 페이지에 보여줄 메뉴 업데이트 실패", async () => {
    const menuIds: number[] = [1, 2, 3, 4, 5];
    server.use(
      http.put("admin/mainPageMenus", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await putMainPageMenus(menuIds);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("putCategory 테스트 코드", () => {
  const categoryId: number = 1;
  const data: PostMenuInfo = {
    name: "new Category",
    description: "test",
    urlId: "test",
    externalUrl: "test",
    access: {
      option: "test",
      roles: [0],
    },
    write: {
      option: "test",
      roles: [0],
    },
    expose: {
      option: "test",
      roles: [0],
    },
    manage: {
      option: "test",
      roles: [0],
    },
  };
  it("카테고리 수정", async () => {
    const result = await putCategory(categoryId, data);
    expect(result).toStrictEqual({ status: 200 });
  });
  it("카테고리 수정 실패", async () => {
    server.use(
      http.put("admin/menu/:categoryId", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await putCategory(categoryId, data);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("deleteCategory 테스트 코드", () => {
  const categoryId: number = 1;
  it("소분류 카테고리를 삭제", async () => {
    const result = await deleteCategory(categoryId);
    expect(result).toStrictEqual({ categoryId: 1 });
  });
  it("소분류 카테고리 삭제에 실패", async () => {
    server.use(
      http.delete("/admin/menu/:categoryId", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await deleteCategory(categoryId);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("postMoveBoardMenu 테스트 코드", () => {
  const fromBoardMenuId: number = 1;
  const toBoardMenuId: number = 2;
  it("보드 메뉴를 이동", async () => {
    const result = await postMoveBoardMenu(fromBoardMenuId, toBoardMenuId);
    expect(result).toStrictEqual({ status: 200 });
  });
  it("보드 메뉴 이동에 실패", async () => {
    server.use(
      http.post("/admin/menu/migrate", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await postMoveBoardMenu(fromBoardMenuId, toBoardMenuId);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("postMoveCategory 테스트 코드", () => {
  const fromCategoryId: number = 1;
  const toCategoryId: number = 2;
  it("from 카테고리의 모든 게시글을 to 카테고리로 변경", async () => {
    const result = await postMoveCategory(fromCategoryId, toCategoryId);
    expect(result).toStrictEqual({ message: "string" });
  });
  it("카테고리 변경에 실패", async () => {
    server.use(
      http.post("/admin/posts/migrate", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await postMoveCategory(fromCategoryId, toCategoryId);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("postAddMenuOrCategory 테스트 코드", () => {
  const categoryType: string = "CATEGORY";
  it("카테고리를 추가할 경우", async () => {
    const categoryData = {
      superCategoryId: 20,
      name: "new Category",
      description: "test",
      urlId: "test",
      externalUrl: "test",
      access: {
        option: "test",
        roles: [0],
      },
      write: {
        option: "test",
        roles: [0],
      },
      expose: {
        option: "test",
        roles: [0],
      },
      manage: {
        option: "test",
        roles: [0],
      },
    };
    const result = await postAddMenuOrCategory(categoryType, categoryData);
    expect(result).toStrictEqual({ status: 200 });
  });
  it("메뉴를 추가할 경우", async () => {
    const menuData = {
      superCategoryId: null,
      name: "new Menu",
      description: "test",
      urlId: "test",
      externalUrl: "test",
      access: {
        option: "test",
        roles: [0],
      },
      write: {
        option: "test",
        roles: [0],
      },
      expose: {
        option: "test",
        roles: [0],
      },
      manage: {
        option: "test",
        roles: [0],
      },
    };
    const result = await postAddMenuOrCategory(categoryType, menuData);
    expect(result).toStrictEqual({ status: 200 });
  });
  it("카테고리나 메뉴 추가에 실패할 경우", async () => {
    const data = {
      superCategoryId: null,
      name: "new Menu",
      description: "test",
      urlId: "test",
      externalUrl: "test",
      access: {
        option: "test",
        roles: [0],
      },
      write: {
        option: "test",
        roles: [0],
      },
      expose: {
        option: "test",
        roles: [0],
      },
      manage: {
        option: "test",
        roles: [0],
      },
    };
    server.use(
      http.post("admin/menu/:categoryType", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await postAddMenuOrCategory(categoryType, data);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});

describe("putGroupSubMenu 테스트 코드", () => {
  const categoryId: number = 1;
  const data = {
    name: "string",
    superMenuId: 0,
    description: "string",
    urlId: "string",
    externalUrl: "string",
    access: {
      option: "string",
      roles: [0],
    },
    write: {
      option: "string",
      roles: [0],
    },
    expose: {
      option: "string",
      roles: [0],
    },
    manage: {
      option: "string",
      roles: [0],
    },
  };
  it("카테고리를 수정", async () => {
    const result = await putGroupSubMenu(categoryId, data);
    expect(result).toStrictEqual({ status: 200 });
  });
  it("카테고리 수정에 실패", async () => {
    server.use(
      http.put("admin/menu/:categoryId", async () => {
        return new HttpResponse("Internal Server Error", {
          status: 500,
        });
      })
    );
    try {
      await putGroupSubMenu(categoryId, data);
    } catch (error) {
      expect(error).toBe("Internal Server Error");
    }
  });
});
