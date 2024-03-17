import { DateType, Pageable, Role, Sort } from "@types";

declare module "@types" {
  interface FetchAdminMemberListParams {
    page?: number;
    perPage?: number;
    status?: string;
  }
  interface FetchAdminMemberListResponse {
    content: AdminMember[];
    pageable: Pageable;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    sort: Sort;
    totalelements: number;
    totalPages: number;
  }

  interface AdminMember {
    accountId: number;
    loginId: string;
    name: string;
    nickname: string;
    registeredDate: DateType;
    roles: Role[];
  }
}
