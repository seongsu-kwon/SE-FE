import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { reissueToken } from "./auth";
import {
  getStoredAccessToken,
  getStoredRefreshToken,
  isMaintainLogin,
  setStoredAccessToken,
  setStoredRefreshToken,
} from "./storage";

export const getJWTHeader = () => {
  const accessToken = getStoredAccessToken();
  return { Authorization: accessToken ? `Bearer ${accessToken}` : "" };
};

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config: any) => ({
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  }),
  (error) => {
    alert(error.message);
    return Promise.reject(error);
  }
);

// instance.interceptors.request.use(
//   (config) => ({
//     ...config,
//     headers: {
//       "Content-Type": "application/json",
//       ...config.headers,
//     },
//   }),
//   (error) => {
//     alert(error.message);
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  (res) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(res);
    }
    return res;
  },
  async (error) => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }

    if (error.response.data.code === 107) {
      sessionStorage.removeItem("refresh_token");
      localStorage.removeItem("refresh_token");
      alert("로그인이 필요합니다");
      window.location.href = "/login";
    } else if (error.response.data.code === 108) {
      const {
        data: { accessToken, refreshToken },
      } = await reissueToken(getStoredRefreshToken()!);
      if (isMaintainLogin()) {
        setStoredRefreshToken(refreshToken, true);
        setStoredAccessToken(accessToken, true);
      } else {
        setStoredRefreshToken(refreshToken);
        setStoredAccessToken(accessToken);
      }
      error.config.headers = { ...error.config.headers, ...getJWTHeader() };
      return instance(error.config);
    }

    return Promise.reject(error.response.data);
  }
);

// export type APIResponse<T> = {
//   code: string;
//   message: string;
//   result: T;
//   error?: string;
// };

export const _axios = async <T>(
  props: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const result = await instance(props);
  return result;
};
