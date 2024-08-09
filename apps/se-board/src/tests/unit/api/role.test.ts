import { _axios, getJWTHeader } from "@/api/axiosInstance";
import { HTTP_METHODS } from "@/api/index";
import { deleteRole, getRoleInfos, postRole, putRole } from "@/api/Role";

jest.mock("@/api/axiosInstance", () => ({
  _axios: jest.fn(),
  getJWTHeader: jest.fn(),
}));

describe("역할 관리 API 호출", () => {
  const mockedAxios = _axios as jest.Mock;
  const mockedGetJWTHeader = getJWTHeader as jest.Mock;

  beforeEach(() => {
    mockedAxios.mockClear();
    mockedGetJWTHeader.mockClear();
    mockedGetJWTHeader.mockReturnValue({ Authorization: "Bearer mockToken" });
  });

  describe("getRoleInfos", () => {
    it("페이지네이션을 적용하여 역할 정보를 GET 요청으로 가져와야 합니다.", async () => {
      const mockResponse = {
        data: [
          { id: 1, name: "Admin" },
          { id: 2, name: "User" },
        ],
      };
      mockedAxios.mockResolvedValue(mockResponse);

      const page = 1;
      const perPage = 10;
      const result = await getRoleInfos(page, perPage);

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: `/admin/roles?page=${page}&perPage=${perPage}`,
        method: HTTP_METHODS.GET,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("기본 페이지네이션을 사용하여 GET 요청을 보내야 합니다.", async () => {
      const mockResponse = { data: [] };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await getRoleInfos();

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: `/admin/roles?page=0&perPage=0`,
        method: HTTP_METHODS.GET,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인해야 합니다.", async () => {
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await getRoleInfos();
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("deleteRole", () => {
    it("역할을 DELETE 요청으로 삭제해야 합니다.", async () => {
      const roleId = 1;
      const mockResponse = { data: { success: true } };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await deleteRole(roleId);

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: `/admin/roles/${roleId}`,
        method: HTTP_METHODS.DELETE,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인해야 합니다.", async () => {
      const roleId = 1;
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await deleteRole(roleId);
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("putRole", () => {
    it("역할을 PUT 요청으로 업데이트해야 합니다.", async () => {
      const roleId = 1;
      const roleData = {
        name: "Admin",
        alias: "admin",
        description: "Administrator role",
      };
      const mockResponse = { data: { success: true } };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await putRole(roleId, roleData);

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: `/admin/roles/${roleId}`,
        method: HTTP_METHODS.PUT,
        data: roleData,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인해야 합니다.", async () => {
      const roleId = 1;
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await putRole(roleId, {
          name: "Admin",
          alias: "admin",
          description: "Administrator role",
        });
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });

  describe("postRole", () => {
    it("새로운 역할을 POST 요청으로 생성해야 합니다.", async () => {
      const roleData = {
        name: "Moderator",
        alias: "mod",
        description: "Moderator role",
      };
      const mockResponse = { data: { success: true } };
      mockedAxios.mockResolvedValue(mockResponse);

      const result = await postRole(roleData);

      expect(mockedAxios).toHaveBeenCalledWith({
        headers: { Authorization: "Bearer mockToken" },
        url: `/admin/roles`,
        method: HTTP_METHODS.POST,
        data: roleData,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("서버에서 오류가 발생했을 경우 오류 메시지를 확인해야 합니다.", async () => {
      const roleData = {
        name: "Moderator",
        alias: "mod",
        description: "Moderator role",
      };
      const errorMessage = "Internal Server Error";
      mockedAxios.mockRejectedValue(new Error(errorMessage));

      try {
        await postRole(roleData);
      } catch (error) {
        expect(error).toEqual(new Error(errorMessage));
      }
    });
  });
});
