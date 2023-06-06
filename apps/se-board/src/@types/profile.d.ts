declare module "@types" {
  interface FetchUserSimpleInfoResponse {
    nickname: string;
    email: string;
    roles: string[];
  }
  interface FetchUserProfileReqsponse {
    nickname: string;
    postCount: number;
    commentCount: number;
    bookmarkCount: number | null;
  }
}
