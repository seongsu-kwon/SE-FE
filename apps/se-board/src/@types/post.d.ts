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
    loginId: string;
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
    loginId: string;
    name: string;
  }

  interface PostDetatilCategory {
    categoryId: number;
    name: string;
  }

  interface Attachment {
    fileMetaDataId: number;
    originalFileName: string;
    storedFileName: string;
    url: string;
  }

  interface PostDetail {
    postId: number;
    title: string;
    author: Author;
    views: number;
    category: PostDetatilCategory;
    createdAt: DateType;
    modifiedAt: DateType;
    contents: string;
    bookmarked: boolean;
    isEditable: boolean;
    exposeType: string;
    attachments: { fileMetaDataList: Attachment[] }; // 파일 로직 추가 후 수정 필요
    pined: boolean;
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
    attachmentIds: number[]; // 파일 로직 추가 후 수정 필요
  }

  interface PostCreate {
    title: string;
    contents: string;
    categoryId: number;
    pined: boolean;
    exposeOption: exposeOptionDTO;
    attachmentIds: number[]; // 파일 로직 추가 후 수정 필요
    anonymous: boolean;
  }
}
