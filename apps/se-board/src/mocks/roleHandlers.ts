import { http, HttpResponse } from "msw";

const getRoleInfosHandler = http.get("/admin/roles", (req) => {
  const mockResponse = {
    data: [
      { id: 1, name: "Admin" },
      { id: 2, name: "User" },
    ],
  };

  return HttpResponse.json(mockResponse);
});

const deleteRoleHandler = http.delete("/admin/roles/:id", (req) => {
  return HttpResponse.json({ success: true });
});

const putRoleHandler = http.put("/admin/roles/:id", (req) => {
  return HttpResponse.json({ success: true });
});

const postRoleHandler = http.post("/admin/roles", (req) => {
  return HttpResponse.json({ success: true });
});

export const roleHandlers = [
  getRoleInfosHandler,
  deleteRoleHandler,
  putRoleHandler,
  postRoleHandler,
];
