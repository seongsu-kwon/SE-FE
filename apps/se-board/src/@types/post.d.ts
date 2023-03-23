import { DateType } from "@types";

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
    commentsSize: number;
    pined: boolean;
  }

  interface CategoryDTO {
    mainCategory: string;
    subCategory: string;
  }

  interface AuthorDTO {
    userId: string;
    name: string;
  }

  interface PostListItem {
    postId: number;
    title: string;
    author: Author;
    views: number;
    createdDateTime: DateType;
    modifiedDateTime: DateType;
    hasAttachment: boolean;
    commentsSize: number;
    pined: boolean;
  }

  interface Author {
    userId: string;
    name: string;
  }
}
