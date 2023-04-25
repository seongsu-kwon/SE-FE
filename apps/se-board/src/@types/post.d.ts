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
    category: CategoryDTO;
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

  interface PostDetail {
    postId: number;
    title: string;
    author: Author;
    views: number;
    category: CategoryDTO;
    createdAt: DateType;
    modifiedAt: DateType;
    contents: string;
    isBookmarked: boolean;
    isEditable: boolean;
    // 게시글 공개 범위 추가 필요
    attachments: any; // 파일 로직 추가 후 수정 필요
  }

  interface exposeOptionDTO {
    name: string;
    password?: string;
  }

  interface PostPut {
    title: string;
    contents: string;
    categoryId: number;
    pined: boolean;
    exposeOption: exposeOptionDTO;
    attachments: any; // 파일 로직 추가 후 수정 필요
  }
}
