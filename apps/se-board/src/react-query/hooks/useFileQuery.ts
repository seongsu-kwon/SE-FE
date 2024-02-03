import { useMutation } from "@tanstack/react-query";

import { deleteFile, postFile } from "@/api/file";

export const usePostFileQuery = () => {
  return useMutation((formData: FormData) => postFile(formData), {
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useDeleteFileQuery = () => {
  return useMutation((fileId: number) => deleteFile(fileId), {
    onError: (err) => {
      console.error(err);
    },
  });
};
