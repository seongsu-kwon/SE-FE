import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const putLoginLimitTime = (time: number) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/accountPolicy/login/time",
    method: HTTP_METHODS.PUT,
  }).then((res) => res.data);
};
