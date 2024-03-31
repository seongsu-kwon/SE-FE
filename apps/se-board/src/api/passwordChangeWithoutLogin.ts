import { HTTP_METHODS } from ".";
import { _axios } from "./axiosInstance";

export const requestPasswordChangeEmailAuthCode = async (email: string) => {
  return _axios({
    url: "email/password",
    method: HTTP_METHODS.POST,
    data: { email },
  });
};

export const checkPasswordChangeAuthCode = async (data: {
  email: string;
  authToken: string;
}) => {
  return _axios({
    url: "email/password/confirm",
    method: HTTP_METHODS.POST,
    data,
  });
};

export const changePasswordWithoutLogin = async (data: {
  email: string;
  password: string;
}) => {
  return _axios({
    url: "password",
    method: HTTP_METHODS.POST,
    data,
  });
};
