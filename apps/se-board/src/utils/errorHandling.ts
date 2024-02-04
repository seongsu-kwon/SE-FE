import { ErrorCode } from "@types";

import { useNavigatePage } from "@/hooks";

export const incorrectPostPassword = () => {
  return alert("비밀번호가 틀렸습니다.");
};

const errorCodeToAlert = [
  103, 109, 115, 117, 118, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131,
  132, 133, 134, 135, 136, 137, 138, 140, 141, 142, 143, 202, 203, 204, 301,
  302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 400,
];
const errorCodeToAlertAndGoToBack = [104, 200, 201, 300];

export const errorHandle = (error: unknown) => {
  const { goToBackPage } = useNavigatePage();
  const { code, message } = error as ErrorCode;

  if (errorCodeToAlert.includes(code)) {
    return alert(message);
  } else if (errorCodeToAlertAndGoToBack.includes(code)) {
    alert(message);
    goToBackPage();
  } else if (code === 139) {
    alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    location.reload();
  }
};
