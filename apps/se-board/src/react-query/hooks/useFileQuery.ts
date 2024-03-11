import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteFile,
  deleteFileExtension,
  getFileExtensions,
  postFile,
  postFileExtension,
} from "@/api/file";

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

export const useGetFileExtensionsQuery = () => {
  return useQuery(["fileExtensions"], getFileExtensions, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 61,
    onError: (error) => {
      console.error(error);
    },
  });
};

export const usePostFileExtensionMutation = () => {
  return useMutation((extensions: string[]) => postFileExtension(extensions), {
    onError: (err) => {
      console.error(err);
    },
  });
};

export const useDeleteFileExtensionMutation = () => {
  return useMutation(
    (extensions: string[]) => deleteFileExtension(extensions),
    {
      onError: (err) => {
        console.error(err);
      },
    }
  );
};
