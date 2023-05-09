import {
  checkAuthCodeDTO,
  FormLoginResponse,
  LoginDTO,
  LoginFormFileds,
  OAuthSignupDTO,
  OAuthUserBasicInfoResponse,
  SignupDTO,
} from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const requestEmailAuthCode = async (email: string) => {
  return _axios({
    url: "email/auth",
    method: HTTP_METHODS.POST,
    data: { email },
  });
};

export const checkAuthCode = async (data: checkAuthCodeDTO) => {
  return _axios({
    url: "email/confirm",
    method: HTTP_METHODS.POST,
    data,
  });
};

export const signup = async (data: SignupDTO) => {
  return _axios({
    url: "account/form",
    method: HTTP_METHODS.POST,
    data,
  });
};

export const oAuthSignup = async (data: OAuthSignupDTO) => {
  return _axios({
    url: "account/oauth",
    method: HTTP_METHODS.POST,
    data,
  });
};

export const checkDuplicatedNicname = async (nickname: string) => {
  return _axios<{ duplication: boolean }>({
    url: "account/nickname",
    method: HTTP_METHODS.POST,
    data: { nickname },
  });
};

export const login = async (data: LoginDTO) => {
  return _axios<FormLoginResponse>({
    url: "formLogin",
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  });
};

export const loginWithKakao = async (id: string) => {
  return _axios<FormLoginResponse>({
    url: "auth/kakao",
    method: HTTP_METHODS.GET,
    params: { id },
  });
};

//----- converter -----
export const convertLoginFormFiledsToLoginDTO = (
  data: LoginFormFileds
): LoginDTO => {
  return {
    username: data.id,
    password: data.password,
  };
};

export const fetchOAUthUserBasicInfo = async (id: string) => {
  return _axios<OAuthUserBasicInfoResponse>({
    url: "register/oauth",
    method: HTTP_METHODS.GET,
    params: { id },
  });
};

export const logout = async () => {
  return _axios<{ requiredRedirect: boolean; url: string }>({
    url: "logoutProc",
    method: HTTP_METHODS.GET,
    headers: {
      ...getJWTHeader(),
    },
  });
};

export const reissueToken = async (refreshToken: string) => {
  return _axios<{ accessToken: string; refreshToken: string }>({
    url: "refresh",
    method: HTTP_METHODS.POST,
    data: { refreshToken },
  });
};
