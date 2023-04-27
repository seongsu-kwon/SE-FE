declare module "@types" {
  interface SubComment {
    commentId: number;
    tag: number;
    author: {
      loginId: string | null;
      name: string;
    };
    createdAt: string;
    modifiedAt: string;
    contents: string;
    isEditable: boolean;
    isActive: boolean;
  }

  interface Comment {
    commentData: any;
    totalSize: number;
    totalElements: number;
    last: boolean;
    number: number;
    content: {
      commentId: number;
      author: {
        loginId: string;
        name: string;
      };
      createdAt: string;
      modifiedAt: string;
      contents: string;
      isEditable: boolean;
      isActive: boolean;
      subComments: SubComment[];
    }[];
  }

  interface SubCommentInfoType {
    superCommentId: number | null;
    tagCommentId: number | null;
    tagCommentAuthorName: string | null;
  }
}
