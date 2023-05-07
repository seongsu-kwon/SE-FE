declare module "@types" {
  interface subComment {
    comment_id: number;
    tag: number;
    author: {
      loginId: string | null;
      name: string;
    };
    created_at: string;
    modified_at: string;
    contents: string;
    isEditable: boolean;
  }

  interface Comment {
    pagenationInfo: {
      contentSize: number;
      perPage: number;
      currentPage: number;
      lastPage: number;
    };
    data: {
      commentId: number;
      author: {
        loginId: string;
        name: string;
      };
      createdAt: string;
      modifiedAt: string;
      contents: string;
      isEditable: boolean;
      subComments: subComment[];
    }[];
  }

  interface subCommentInfoType {
    superCommentId: number | null;
    tagCommentId: number | null;
    tagCommentAuthorName: string | null;
  }
}
