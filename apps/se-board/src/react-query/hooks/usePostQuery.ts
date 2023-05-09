import { useMutation, useQuery } from "@tanstack/react-query";
import { PostCreate, PostDetail, PostPut } from "@types";
import { AxiosResponse } from "axios";

import { customAxios } from "@/api/CustomAxios";

const fetchGetPost = async (
  postId: string | undefined
): Promise<PostDetail> => {
  const response = customAxios.get(`/posts/${postId}`);
  return response.then((res: AxiosResponse<PostDetail>) => res.data);
};

export const useGetPostQuery = (
  postId: string | undefined,
  enabledOption: boolean = true
) => {
  return useQuery<PostDetail>(["post", postId], () => fetchGetPost(postId), {
    staleTime: 1000 * 60, // stale 상태로 변경되기 전까지의 시간
    enabled: enabledOption,
  });
};

interface PostResData {
  id: number;
  message: string;
}

const postPost = async (reqBody: PostCreate): Promise<PostResData> => {
  return customAxios.post("/posts", reqBody);
};

export const usePostPostMutation = () => {
  return useMutation((reqBody: PostCreate) => postPost(reqBody));
};

const putPost = async (postId: number, data: PostPut): Promise<PostResData> => {
  const url = `/posts/${postId}`;
  const response = customAxios.put(url, data);

  return response.then((res: AxiosResponse) => res.data);
};

export const usePutPostMutation = () => {
  return useMutation((param: { postId: number; data: PostPut }) =>
    putPost(param.postId, param.data)
  );
};

const bookmarkPost = async (postId: number) => {
  const url = `/posts/${postId}/bookmark`;
  const response = customAxios.post(url);

  return response.then((res: AxiosResponse) => res.data);
};

export const useBookmarkPostMutation = () => {
  return useMutation((postId: number) => bookmarkPost(postId));
};

const bookmarkDelete = async (postId: number) => {
  const url = `/posts/${postId}/bookmark`;
  const response = customAxios.delete(url);

  return response.then((res: AxiosResponse) => res.data);
};

export const useBookmarkDeleteMutation = () => {
  return useMutation((postId: number) => bookmarkDelete(postId));
};

const deletePost = async (postId: number) => {
  const url = `/posts/${postId}`;
  const response = customAxios.delete(url);

  return response.then((res: AxiosResponse) => res.data);
};

export const useDeletePostMutation = (postId: number) => {
  return useMutation(() => deletePost(postId));
};

const secretPost = async (postId: number, password: string) => {
  const response = customAxios.post(`/posts/${postId}/auth`, {
    password: password,
  });

  return response.then((res: AxiosResponse) => res.data);
};

export const useSecretPostMutation = () => {
  return useMutation((param: { postId: number; password: string }) =>
    secretPost(param.postId, param.password)
  );
};
