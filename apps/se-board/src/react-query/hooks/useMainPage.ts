import { useQuery } from "@tanstack/react-query";
import { MainpageMenuInfo } from "@types";
import { AxiosError, AxiosResponse } from "axios";

import { fetchMainPageMenu } from "@/api/mainpage";

export const useMainPageMenu = () => {
  return useQuery<
    AxiosResponse<MainpageMenuInfo[]>,
    AxiosError,
    MainpageMenuInfo[]
  >(["mainPageMenu"], fetchMainPageMenu, {
    select: (res) => res.data,
  });
};
