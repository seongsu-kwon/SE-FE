import { Attachment } from "./Attachment";
import { Sort } from "./Comment";

declare module "@types" {
  interface AddBannerBody {
    startDate: string;
    endDate: string;
    bannerUrl: string;
    fileMetaDataId: number;
  }

  interface Banner {
    bannerId: number;
    startDate: string;
    endDate: string;
    fileMetaData: Attachment;
    bannerUrl: string;
  }

  interface BannerInfo {
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
    content: Banner[];
    number: number;
    empty: boolean;
  }
}
