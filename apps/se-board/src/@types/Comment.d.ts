import { AuthorDTO, DateType, Pageable, PageableInfo } from "@types";
import { CommentPaginationInfo } from "@types";
declare module "@types" {
  interface Comment extends CommentContent {
    subComments: SubCommentContent[];
  }

  interface CommentContent {
    commentId: number;
    author: {
      userId: string;
      name: string;
    };
    createdAt: string;
    modifiedAt: string;
    contents: string;
    isEditable: boolean;
    isActive: boolean;
    isReadOnlyAuthor: boolean;
  }

  interface SubCommentContent extends CommentContent {
    tag: number | null;
  }

  interface CommentsData {
    paginationInfo: CommentPaginationInfo;
    content: Comment[];
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
    number: number;
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
    author: AuthorDTO;
    contents: string;
    createdAt: DateType;
    modifiedAt: DateType;
    isReported: boolean;
    isReadOnlyAuthor: boolean;
  }

  interface AllComments extends PageableInfo {
    content: AdminCommentContent[];
  }
}
