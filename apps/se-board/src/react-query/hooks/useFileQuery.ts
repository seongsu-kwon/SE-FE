import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { customAxios, customAxiosForFile } from "@/api/CustomAxios";

export const postFile = async (formData: FormData) => {
  const response = customAxiosForFile.post("/files", formData);

  return response.then((res: AxiosResponse) => res.data);
};

export const usePostFileQuery = () => {
  return useMutation((formData: FormData) => postFile(formData));
};

const deleteFile = async (fileId: number) => {
  const response = customAxios.delete(`/files/${fileId}`);

  return response.then((res: AxiosResponse) => res.data);
};

export const useDeleteFileQuery = () => {
  return useMutation((fileId: number) => deleteFile(fileId));
};
