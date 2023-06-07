import { useMutation, useQuery } from "@tanstack/react-query";
import { PostMenuInfo } from "@types";
import { useSetRecoilState } from "recoil";

import { fetchBanners } from "@/api/mainpage";
import {
  deleteCategory,
  fetchMenuList,
  getCategory,
  getMainPageMenus,
  getMenuInfo,
  getMenuList,
  getSelectedMainPageMenus,
  postAddCategory,
  postMenuInfo,
  postMoveCategory,
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

export const usePostMenuInfo = () => {
  return useMutation(
    (param: { categoryId: number; data: PostMenuInfo }) =>
      postMenuInfo(param.categoryId, param.data),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};

export const useDeleteCategory = () => {
  return useMutation((categoryId: number) => deleteCategory(categoryId), {
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const usePostMoveCategory = () => {
  return useMutation(
    (param: { fromCategoryId: number; toCategoryId: number }) =>
      postMoveCategory(param.fromCategoryId, param.toCategoryId),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};

export const usePostAddCategory = () => {
  return useMutation(
    (param: {
      categoryType: string;
      data: { superCategoryId: number | null } & PostMenuInfo;
    }) => postAddCategory(param.categoryType, param.data),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};
