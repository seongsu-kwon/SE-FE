import { DateType, Pageable } from "@types";

declare module "@types" {
  interface PostListItemDTO {
    postId: number;
    title: string;
    author: AuthorDTO;
    views: number;
    category: CategoryDTO;
    createdAt: DateType;
    modifiedAt: DateType;
    hasAttachment: boolean;
    commentSize: number;
    pined: boolean;
  }

  interface CategoryDTO {
    categoryId: number;
    name: string;
  }

  interface AuthorDTO {
    loginId: string | null;
    name: string;
  }

  interface PostListItem {
    postId: number;
    title: string;
    author: Author;
    views: number;
    category: CategoryDTO;
    createdDateTime: DateType;
    modifiedDateTime: DateType;
    hasAttachment: boolean;
    commentSize: number;
    pined: boolean;
  }

  interface Author {
    loginId: string | null;
    name: string;
  }

  interface FetchPostListResponse {
    content: PostListItemDTO[];
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

  interface FetchPostListParams {
    categoryId: number;
    page?: number;
    perPage?: number;
  }

  interface SearchPostParams {
    categoryId: number;
    searchOption: string;
    query: string;
    page?: number;
    perPage?: number;
  }
}
