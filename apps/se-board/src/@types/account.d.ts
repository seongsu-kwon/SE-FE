import { PageableInfo, Role } from "@types";

declare module "@types" {
  interface AccountContent {
    accountId: number;
    loginId: string;
    name: string;
    nickname: string;
    registeredDate: string;
    roles: Role[];
  }

  interface DeletedAccounts extends PageableInfo {
    content: AccountContent[];
  }

  interface AccountIds {
    accountIds: number[];
  }
}
