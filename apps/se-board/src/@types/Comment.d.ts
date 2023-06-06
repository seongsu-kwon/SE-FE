import { AuthorDTO, DateType, Pageable } from "@types";

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

  interface FetchCommentListResponse {
    content: CommentListItemDTO[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    first: boolean;
    empty: boolean;
  }

  interface CommentListItemDTO {
    commentId: number;
    superCommendId: number | null;
    tagCommetId: number | null;
    postId: number;
    author: AuthorDTO;
    contents: string;
    createdAt: DateType;
    modifiedAt: DateType;
  }

  interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  }

  interface AdminCommentContent {
    commentId: number;
    superCommentId: number | null;
    tagCommentId: number | null;
    menu: {
      menuId: number;
      name: string;
      urlId: string;
    };
    postId: number;
    author: {
      loginId: string;
      name: string;
    };
    contents: string;
    createdAt: string;
    modifiedAt: string;
    isReported: boolean;
    isReadOnlyAuthor: boolean;
  }

  interface AllComments {
    totalPages: number; // 전체 페이지
    totalElements: number; // 전체 댓글 갯수
    numberOfElements: number; // 현재 페이지 댓글 갯수
    pageable: {
      pageSize: number; // 페이지당 댓글 갯수
      pageNumber: number; //현재 페이지
      unpaged: boolean;
      paged: boolean;
      sort: Sort;
      offset: number;
    };
    sort: Sort;
    first: boolean;
    last: boolean;
    size: number;
    content: AdminCommentContent[];
    number: number;
    empty: boolean;
  }
}
