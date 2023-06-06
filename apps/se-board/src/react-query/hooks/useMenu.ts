import { useMutation, useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import { fetchBanners } from "@/api/mainpage";
import {
  fetchMenuList,
  getCategory,
  getMainPageMenus,
  getMenuInfo,
  getMenuList,
  getSelectedMainPageMenus,
  putMainPageMenus,
} from "@/api/menu";
import { menuListState } from "@/store/menu";
import { errorHandle } from "@/utils/errorHandling";

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

export const useGetMenuList = () => {
  return useQuery(["adminMenuList"], getMenuList, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const useGetCategory = (categoryId: number) => {
  return useQuery(
    ["adminCategory", categoryId],
    () => getCategory(categoryId),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      enabled: categoryId !== -1,
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};

export const useGetMainPageMenus = () => {
  return useQuery(["mainPageMenus"], getMainPageMenus, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const useGetSelectedMainPageMenus = () => {
  return useQuery(["selectedMainPageMenus"], getSelectedMainPageMenus, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const useFetchBanners = () => {
  return useQuery(["banners"], fetchBanners, {});
};

export const usePutMainPageMenus = () => {
  return useMutation((menuIds: number[]) => putMainPageMenus(menuIds), {
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const useGetMenuInfo = (categoryId: number) => {
  return useQuery(["menuInfo", categoryId], () => getMenuInfo(categoryId), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    onError: (err) => {
      errorHandle(err);
    },
  });
};
