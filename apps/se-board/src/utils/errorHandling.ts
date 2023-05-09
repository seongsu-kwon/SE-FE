import { AxiosError } from "axios";

import {
  ErrorFieldAlert,
  ExceededNumberAlert,
  GotoLoginAlert,
  NoneAttachmentAlert,
  NoneCategoryAlert,
  NoneCommentAlert,
  NonePostAlert,
  NoPermissionsAlert,
  SecretPostPWInputModal,
} from "@/components";

interface ErrorData {
  code: number;
  message: string;
  id?: number;
}

export const errorHandle = (error: unknown) => {
  const { response } = error as AxiosError<ErrorData>;

  if (response) {
    const { status } = response;
    const data = response.data as ErrorData;

    switch (status) {
      case 400:
        switch (data.code) {
          case 113:
            // 비밀글 일 때
            return SecretPostPWInputModal;
          case 114:
            // 비밀글 비밀번호 틀림
            return alert("비밀번호가 틀렸습니다.");
          case 201:
            // 필수 필드 누락
            return ErrorFieldAlert;
        }
        break;
      case 401:
        switch (data.code) {
          case 102:
            console.log("로그인 필요");
            return GotoLoginAlert;
        }
        break;
      case 403:
        switch (data.code) {
          case 103:
            // 권한 없음
            return NoPermissionsAlert;
          case 115:
            // 글, 댓글 작성 횟수 초과
            return ExceededNumberAlert;
        }
        break;
      case 404:
        switch (data.code) {
          case 300:
            // 게시글 없음
            return NonePostAlert;
          case 301:
            // 카테고리 없음
            return NoneCategoryAlert;
          case 302:
            // 첨부파일 id 없음
            return NoneAttachmentAlert;
          case 303:
            // 댓글 없음
            return NoneCommentAlert;
        }
        break;
      case 500:
        // 서버 에러
        alert("서버 에러입니다. 관리자에게 문의해주세요.");
        break;
    }
  }
};
