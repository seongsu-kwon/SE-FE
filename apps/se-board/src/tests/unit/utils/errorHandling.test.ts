import { errorHandle } from "@/utils/errorHandling";
import { ErrorCode } from "@types";

global.alert = jest.fn();
global.location.reload = jest.fn();
global.location.replace = jest.fn();
global.window.history.back = jest.fn();

describe('errorHandle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call alert with the error message for codes in errorCodeToAlert', () => {
    const error: ErrorCode = { code: 103, message: "An error occurred." };
    errorHandle(error);
    expect(global.alert).toHaveBeenCalledWith("An error occurred.");
  });

  it('should call alert and window.history.back for codes in errorCodeToAlertAndGoToBack', () => {
    const error: ErrorCode = { code: 104, message: "Go back error." };
    errorHandle(error);
    expect(global.alert).toHaveBeenCalledWith("Go back error.");
    expect(global.window.history.back).toHaveBeenCalled();
  });

  it('should call alert and location.replace for codes in errorCodeToAlertAndMain', () => {
    const error: ErrorCode = { code: 146, message: "Redirect to main error." };
    errorHandle(error);
    expect(global.alert).toHaveBeenCalledWith("Redirect to main error.");
    expect(global.location.replace).toHaveBeenCalledWith("/");
  });

  it('should call alert and location.reload for code 139', () => {
    const error: ErrorCode = { code: 139, message: "Failed to write comment." };
    errorHandle(error);
    expect(global.alert).toHaveBeenCalledWith("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    expect(global.location.reload).toHaveBeenCalled();
  });

  it('should not call alert or any other action for an unknown error code', () => {
    const error: ErrorCode = { code: 999, message: "Unknown error." };
    errorHandle(error);
    expect(global.alert).not.toHaveBeenCalled();
    expect(global.window.history.back).not.toHaveBeenCalled();
    expect(global.location.replace).not.toHaveBeenCalled();
    expect(global.location.reload).not.toHaveBeenCalled();
  });
});
