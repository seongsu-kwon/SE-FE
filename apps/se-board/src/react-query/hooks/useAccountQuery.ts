import { useMutation, useQuery } from "@tanstack/react-query";
import { AccountIds } from "@types";

import {
  getDeletedAccounts,
  permanentlyDeleteAccounts,
  restoreAccounts,
} from "@/api/account";
import { errorHandle } from "@/utils/errorHandling";

export const useGetDeleteAccountsQuery = (page?: number, perPage?: number) => {
  return useQuery(
    ["deleteAccounts", page, perPage],
    () => getDeletedAccounts(page, perPage),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 61,
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};

export const usePostRestoreAccountsQuery = () => {
  return useMutation((accountIds: AccountIds) => restoreAccounts(accountIds), {
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const usePermanentlyDeleteAccountsQuery = () => {
  return useMutation(
    (accountIds: AccountIds) => permanentlyDeleteAccounts(accountIds),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};
