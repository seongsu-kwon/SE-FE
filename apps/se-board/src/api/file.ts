import { FileUploadRes } from "@types";

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
