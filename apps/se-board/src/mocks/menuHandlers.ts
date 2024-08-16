import { http, HttpResponse } from "msw";

export const menuHandlers = [
  http.get("/menu", () => {
    return HttpResponse.json([
      {
        menuId: 0,
        name: "string",
        urlId: "string",
        externalUrl: "string",
        type: "string",
      },
    ]);
  }),
  http.get("/admin/menu", () => {
    return HttpResponse.json([
      {
        menuId: 0,
        name: "string",
        urlId: "string",
      },
    ]);
  }),
  http.get("/admin/menu/:categoryId", () => {
    return HttpResponse.json({
      menuId: 0,
      name: "string",
      urlId: "string",
    });
  }),
  http.get("admin/mainPageMenus/all", () => {
    return HttpResponse.json([
      {
        categoryId: 0,
        name: "string",
        description: "string",
        url: "string",
      },
    ]);
  }),
  http.get("admin/mainPageMenus", () => {
    return HttpResponse.json([
      {
        id: 0,
        menuId: 0,
        name: "string",
        url: "string",
        description: "string",
      },
    ]);
  }),
  http.put("admin/mainPageMenus", () => {
    return HttpResponse.json({ status: 200 });
  }),
  http.put(`/admin/menu/:categoryId`, () => {
    return HttpResponse.json({ status: 200 });
  }),
  http.delete("/admin/menu/:categoryId", () => {
    return HttpResponse.json({ categoryId: 1 });
  }),
  http.post("/admin/menu/migrate", () => {
    return HttpResponse.json({ status: 200 });
  }),
  http.post("/admin/posts/migrate", () => {
    return HttpResponse.json({
      message: "string",
    });
  }),
  http.post("/admin/menu", ({ request }) => {
    const url = new URL(request.url);
    // not used searchParams
    //const categoryType = url.searchParams.get("categoryType");
    return HttpResponse.json({ status: 200 });
  }),
  http.put("/admin/menu/:categoryId", () => {
    return HttpResponse.json({ status: 200 });
  }),
];
