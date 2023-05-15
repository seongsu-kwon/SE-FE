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
    isReadOnlyAuthor: boolean;
  }

  interface PaginationInfo {
    totalAllSize: number;
    totalCommentSize: number;
    last: boolean;
    pageNum: number;
  }

  interface Content {
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
    isReadOnlyAuthor: boolean;
    subComments: SubComment[];
  }

  interface Comment {
    paginationInfo: PaginationInfo;
    content: Content[];
  }

  interface SubCommentInfoType {
    superCommentId: number | null;
    tagCommentId: number | null;
    tagCommentAuthorName: string | null;
  }

  interface PostCommentData {
    postId: number;
    contents: string;
    isAnonymous: boolean;
    isReadOnlyAuthor: boolean;
  }

  interface PutCommentData {
    contents: string;
    isReadOnlyAuthor: boolean;
  }

  interface PostReplyData {
    postId: number;
    superCommentId: number;
    tagCommentId: number;
    contents: string;
    isAnonymous: boolean;
    isReadOnlyAuthor: boolean;
  }
}
