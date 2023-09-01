import { useMutation, useQuery } from "@tanstack/react-query";
import { PostCreate, PostPut } from "@types";

import {
  bookmarkDelete,
  bookmarkPost,
  deletePost,
  fetchGetPost,
  getDeletedPosts,
  permanentlyDeletePosts,
  postPost,
  putPost,
  restorePosts,
  secretPost,
} from "@/api/post";
import { errorHandle } from "@/utils/errorHandling";

export const useGetPostQuery = (
  postId: string | undefined,
  enabledOption: boolean = true
) => {
  return useQuery(["post", postId], () => fetchGetPost(postId), {
    staleTime: 1000 * 60, // stale 상태로 변경되기 전까지의 시간
    enabled: enabledOption,
    retry: (failureCount, error) => {
      const { code } = error as { code: number; message: string };

      if (code === 113) {
        return false;
      }

      return true;
    },
  });
};

interface PostResData {
  id: number;
  message: string;
}

export const usePostPostMutation = () => {
  return useMutation((reqBody: PostCreate) => postPost(reqBody));
};

export const usePutPostMutation = () => {
  return useMutation((param: { postId: number; data: PostPut }) =>
    putPost(param.postId, param.data)
  );
};

export const useBookmarkPostMutation = () => {
  return useMutation((postId: number) => bookmarkPost(postId));
};

export const useBookmarkDeleteMutation = () => {
  return useMutation((postId: number) => bookmarkDelete(postId));
};

export const useDeletePostMutation = () => {
  return useMutation((postId: number) => deletePost(postId));
};

export const useSecretPostMutation = () => {
  return useMutation((param: { postId: number; password: string }) =>
    secretPost(param.postId, param.password)
  );
};

export const useGetDeletedPostQuery = (page?: number, perPage?: number) => {
  return useQuery(
    ["deletedPost", page, perPage],
    () => getDeletedPosts(page, perPage),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 61,
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};

export const usePostRestorePostQuery = () => {
  return useMutation((postIds: number[]) => restorePosts(postIds), {
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const usePermanentlyDeletePostQuery = () => {
  return useMutation((postIds: number[]) => permanentlyDeletePosts(postIds), {
    onError: (err) => {
      errorHandle(err);
    },
  });
};
