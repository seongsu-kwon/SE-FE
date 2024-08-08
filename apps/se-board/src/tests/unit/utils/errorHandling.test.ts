import { ErrorCode } from "@types";

import { errorHandle, incorrectPostPassword } from "@/utils/errorHandling";

describe("Error Handling Functions", () => {
  let originalLocation: Location;

  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(window.history, "back").mockImplementation(() => {});

    originalLocation = window.location;

    delete (window as any).location;
    window.location = {
      ...originalLocation,
      replace: jest.fn(),
      reload: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.location = originalLocation;
  });

  describe("incorrectPostPassword", () => {
    it('should alert "비밀번호가 틀렸습니다."', () => {
      incorrectPostPassword();
      expect(window.alert).toHaveBeenCalledWith("비밀번호가 틀렸습니다.");
    });
  });

  describe("errorHandle", () => {
    it("should alert the message for error codes in errorCodeToAlert", () => {
      const errorCodesToTest = [
        103, 109, 114, 115, 117, 118, 122, 123, 124, 125, 126, 127, 128, 129,
        130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 141, 142, 143, 144,
        145, 202, 203, 204, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310,
        311, 400,
      ];

      errorCodesToTest.forEach((code) => {
        const error: ErrorCode = {
          code,
          message: `Error message for code ${code}`,
        };
        errorHandle(error);
        expect(window.alert).toHaveBeenCalledWith(
          `Error message for code ${code}`
        );
      });
    });

    it("should alert the message and go back for error codes in errorCodeToAlertAndGoToBack", () => {
      const errorCodesToTest = [104, 200, 201, 300];

      errorCodesToTest.forEach((code) => {
        const error: ErrorCode = {
          code,
          message: `Error message for code ${code}`,
        };
        errorHandle(error);
        expect(window.alert).toHaveBeenCalledWith(
          `Error message for code ${code}`
        );
        expect(window.history.back).toHaveBeenCalled();
      });
    });

    it("should alert the message and go to the main page for error codes in errorCodeToAlertAndMain", () => {
      const errorCodesToTest = [146];

      errorCodesToTest.forEach((code) => {
        const error: ErrorCode = {
          code,
          message: `Error message for code ${code}`,
        };
        errorHandle(error);
        expect(window.alert).toHaveBeenCalledWith(
          `Error message for code ${code}`
        );
        expect(window.location.replace).toHaveBeenCalledWith("/");
      });
    });

    it("should alert the message and reload the page for code 139", () => {
      const error: ErrorCode = {
        code: 139,
        message: "Specific message for 139",
      };
      errorHandle(error);
      expect(window.alert).toHaveBeenCalledWith(
        "댓글 작성에 실패했습니다. 다시 시도해주세요."
      );
      expect(window.location.reload).toHaveBeenCalled();
    });

    it("should do nothing for unknown error codes", () => {
      const error: ErrorCode = { code: 999, message: "Unknown error code" };
      errorHandle(error);
      expect(window.alert).not.toHaveBeenCalled();
      expect(window.history.back).not.toHaveBeenCalled();
      expect(window.location.replace).not.toHaveBeenCalled();
      expect(window.location.reload).not.toHaveBeenCalled();
    });
  });
});
