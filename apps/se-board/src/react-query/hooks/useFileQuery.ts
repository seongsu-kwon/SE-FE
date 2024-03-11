import { useMutation, useQuery } from "@tanstack/react-query";
import { FileConfigurations } from "@types";

import {
  deleteFile,
  deleteFileExtension,
  getFileConfigurations,
  getFileExtensions,
  postFile,
  postFileConfigurations,
  postFileExtension,
} from "@/api/file";
import { errorHandle } from "@/utils/errorHandling";

export const usePostFileQuery = () => {
  return useMutation((formData: FormData) => postFile(formData), {
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const useDeleteFileQuery = () => {
  return useMutation((fileId: number) => deleteFile(fileId), {
    onError: (err) => {
      errorHandle(err);
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
      errorHandle(error);
    },
  });
};

export const usePostFileExtensionMutation = () => {
  return useMutation((extensions: string[]) => postFileExtension(extensions), {
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const useDeleteFileExtensionMutation = () => {
  return useMutation(
    (extensions: string[]) => deleteFileExtension(extensions),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};

export const useGetFileConfigurationsQuery = () => {
  return useQuery(["fileConfigurations"], getFileConfigurations, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 61,
    onError: (error) => {
      errorHandle(error);
    },
  });
};

export const usePostFileConfigurationsMutation = () => {
  return useMutation(
    (config: FileConfigurations) => postFileConfigurations(config),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};
