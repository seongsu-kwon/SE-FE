import { AccountIds, DeletedAccounts } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const getDeletedAccounts = (page: number = 0, perPage: number = 25) => {
  return _axios<DeletedAccounts>({
    headers: {
      ...getJWTHeader(),
    },
    url: `/admin/accounts?status=TEMP_DELETED&page=${page}&perPage=${perPage}`,
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const restoreAccounts = (accountIds: AccountIds) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/accounts/restore",
    method: HTTP_METHODS.POST,
    data: accountIds,
  }).then((res) => res.data);
};

export const permanentlyDeleteAccounts = (accountIds: AccountIds) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/accounts/permanent",
    method: HTTP_METHODS.DELETE,
    data: accountIds,
  }).then((res) => res.data);
};
