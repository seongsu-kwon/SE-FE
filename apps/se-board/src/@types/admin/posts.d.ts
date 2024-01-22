import { AuthorDTO, CategoryDTO, DateType, Pageable, Sort } from "@types";

declare module "@types" {
  interface FetchAdminPostListParams {
    page?: number;
    perPage?: number;
    categoryId?: number;
    exposeOption?: string;
    searchOption?: string;
    query?: string;
    isReported?: boolean;
  }
  interface FetchAdminPostListResponse {
    content: AdminPost[];
    pageable: Pageable;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    sort: Sort;
    totalelements: number;
    totalPages: number;
  }

  interface AdminPost {
    author: AuthorDTO;
    category: CategoryDTO;
    exposeOption: string;
    hasAttachment: boolean;
    isReported: boolean;
    menu: {
      menuId: number;
      name: string;
      urlId: string;
    };
    createdAt: DateType;
    modifiedAt: DateType;
    postId: number;
    title: string;
    views: number;
  }
}
