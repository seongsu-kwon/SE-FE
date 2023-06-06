import {
  ErrorFieldAlert,
  ExceededNumberAlert,
  GotoLoginAlert,
  NoneAttachmentAlert,
  NoneCategoryAlert,
  NoneCommentAlert,
  NonePostAlert,
  NoPermissionsAlert,
} from "@/components";

interface ErrorData {
  code: number;
  message: string;
  id?: number;
}

export const errorHandle = (error: unknown) => {
  const { code } = error as ErrorData;

  switch (code) {
    case 114:
      // 비밀글 비밀번호 틀림
      return alert("비밀번호가 틀렸습니다.");
    case 201:
      // 필수 필드 누락
      return ErrorFieldAlert();
    case 102:
      return GotoLoginAlert();
    case 103:
      // 권한 없음
      return NoPermissionsAlert();
    case 115:
      // 글, 댓글 작성 횟수 초과
      return ExceededNumberAlert();
    case 300:
      // 게시글 없음
      return NonePostAlert();
    case 301:
      // 카테고리 없음
      return NoneCategoryAlert();
    case 302:
      // 첨부파일 id 없음
      return NoneAttachmentAlert();
    case 303:
      // 댓글 없음
      return NoneCommentAlert();
    default:
      return;
  }
};
