import { FileUploadRes } from "@types";

import { HTTP_METHODS } from ".";
import { _axios } from "./axiosInstance";

export const postFile = async (formData: FormData) => {
  _axios.arguments.headers = {
    "Content-Type": "multipart/form-data",
  };

  return _axios<FileUploadRes>({
    url: "/files",
    method: HTTP_METHODS.POST,
    data: formData,
  }).then((res) => res.data);
};

export const deleteFile = async (fileId: number) => {
  return _axios({
    url: `/files/${fileId}`,
    method: HTTP_METHODS.DELETE,
  });
};
