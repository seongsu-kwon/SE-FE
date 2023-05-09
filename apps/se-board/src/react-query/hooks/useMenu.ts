import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import { fetchMenuList } from "@/api/menu";
import { menuListState } from "@/store/menu";

import { queryKeys } from "../queryKeys";

export const useFetchMenuList = () => {
  const setMenuList = useSetRecoilState(menuListState);

  return useQuery({
    queryKey: [queryKeys.menuList],
    queryFn: fetchMenuList,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 61,
    onSuccess: (res) => {
      const menuList = res.data;
      setMenuList(menuList);
    },
  });
};
