import { useMutation } from "@tanstack/react-query";

import { deleteFile, postFile } from "@/api/file";

export const usePostFileQuery = () => {
  return useMutation((formData: FormData) => postFile(formData));
};

export const useDeleteFileQuery = () => {
  return useMutation((fileId: number) => deleteFile(fileId));
};
