import { FileConfigurations, FileExtensions, FileUploadRes } from "@types";

import { HTTP_METHODS } from ".";
import { _axios, getJWTHeader } from "./axiosInstance";

export const postFile = async (formData: FormData) => {
  return _axios<FileUploadRes>({
    headers: {
      "Content-Type": "multipart/form-data",
      ...getJWTHeader(),
    },
    url: "/files",
    method: HTTP_METHODS.POST,
    data: formData,
  }).then((res) => res.data);
};

export const deleteFile = async (fileId: number) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: `/files/${fileId}`,
    method: HTTP_METHODS.DELETE,
  });
};

export const getFileExtensions = () => {
  return _axios<FileExtensions>({
    headers: {
      ...getJWTHeader(),
    },
    url: "admin/files/extension",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const postFileExtension = (extensions: string[]) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "admin/files/extension",
    method: HTTP_METHODS.POST,
    data: { extensions },
  });
};

export const deleteFileExtension = (extensions: string[]) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "admin/files/extension",
    method: HTTP_METHODS.DELETE,
    data: { extensions },
  });
};

export const getFileConfigurations = () => {
  return _axios<FileConfigurations>({
    headers: {
      ...getJWTHeader(),
    },
    url: "admin/files/configuration",
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const postFileConfigurations = (config: FileConfigurations) => {
  return _axios({
    headers: {
      ...getJWTHeader(),
    },
    url: "admin/files/configuration",
    method: HTTP_METHODS.POST,
    data: config,
  });
};
