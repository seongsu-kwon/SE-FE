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
}
