import { PageableInfo } from "@types";

declare module "@types" {
  interface AccountContent {
    accountId: number;
    loginId: string;
    name: string;
    nickname: string;
    registeredDate: string;
    authorities: {
      description: string;
      id: number;
      authority: string;
      immutable: boolean;
    }[];
  }

  interface DeletedAccounts extends PageableInfo {
    content: AccountContent[];
  }

  interface AccountIds {
    accountIds: number[];
  }
}
