import { useQuery } from "@tanstack/react-query";

import { fetchMainPageMenu } from "@/api/mainpage";

export const useMainPageMenu = () => {
  return useQuery(["mainPageMenu"], fetchMainPageMenu, {});
};
