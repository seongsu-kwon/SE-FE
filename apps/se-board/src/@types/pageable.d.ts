declare module "@types" {
  interface Pageable {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }

  interface PageableInfo {
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    number: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    first: boolean;
    empty: boolean;
    last: boolean;
  }

  interface CommentPaginationInfo {
    totalAllSize: number;
    totalCommentSize: number;
    last: boolean;
    pageNum: number;
  }
}
