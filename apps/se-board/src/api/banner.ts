import { AddBannerBody, BannerInfo } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const getBanners = (isActive?: boolean) => {
  const url =
    isActive !== undefined
      ? `/admin/banners?isActive=${isActive}`
      : `/admin/banners`;

  return _axios<BannerInfo>({
    headers: {
      ...getJWTHeader(),
    },
    url: url,
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const postBanner = (data: AddBannerBody) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "/admin/banners",
    method: HTTP_METHODS.POST,
    data,
  }).then((res) => res.data);
};

export const putBanner = (bannerId: number, data: AddBannerBody) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: `/admin/banners/${bannerId}`,
    method: HTTP_METHODS.PUT,
    data,
  }).then((res) => res.data);
};

export const deleteBanner = (bannerId: number) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: `/admin/banners/${bannerId}`,
    method: HTTP_METHODS.DELETE,
  }).then((res) => res.data);
};
