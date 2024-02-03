import { useMutation, useQuery } from "@tanstack/react-query";
import { AddBannerBody } from "@types";

import { deleteBanner, getBanners, postBanner, putBanner } from "@/api/banner";
import { errorHandle } from "@/utils/errorHandling";

export const useBannerQuery = (isActive?: boolean) => {
  return useQuery(["bannerInfos"], () => getBanners(isActive), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 61,
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const usePostBannerQuery = () => {
  return useMutation((data: AddBannerBody) => postBanner(data), {
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const usePutBannerQuery = () => {
  return useMutation(
    (param: { bannerId: number; data: AddBannerBody }) =>
      putBanner(param.bannerId, param.data),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};

export const useDeleteBannerQuery = () => {
  return useMutation((bannerId: number) => deleteBanner(bannerId), {
    onError: (err) => {
      errorHandle(err);
    },
  });
};
