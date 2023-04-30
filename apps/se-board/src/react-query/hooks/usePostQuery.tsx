import { useMutation, useQuery } from "@tanstack/react-query";
import { PostDetail, PostPut } from "@types";
import { AxiosResponse } from "axios";

import { customAxios } from "@/api/CustomAxios";

const fetchGetPost = async (
  postId: string | undefined
): Promise<PostDetail> => {
  const response = customAxios.get(`/posts/1234879892103`);
  return response.then((res: AxiosResponse<PostDetail>) => res.data);
};

export const useGetPostQuery = (postId: string | undefined) => {
  return useQuery<PostDetail>(["post", postId], () => fetchGetPost(postId));
};

const putPost = async (postId: number, data: PostPut) => {
  const url = `/posts/${postId}`;
  const response = customAxios.put(url, data);

  return response.then((res: AxiosResponse) => res.data);
};

export const usePutPostMutation = (postId: number, data: PostPut) => {
  return useMutation(() => putPost(postId, data));
};

const bookmarkPost = async (postId: number) => {
  const url = `/posts/${postId}/bookmark`;
  const response = customAxios.post(url);

  return response.then((res: AxiosResponse) => res.data);
};

export const useBookmarkPostMutation = (postId: number) => {
  return useMutation(() => bookmarkPost(postId));
};

const bookmarkDelete = async (postId: number) => {
  const url = `/posts/${postId}/bookmark`;
  const response = customAxios.delete(url);

  return response.then((res: AxiosResponse) => res.data);
};

export const useBookmarkDeleteMutation = (postId: number) => {
  return useMutation(() => bookmarkDelete(postId));
};

const deletePost = async (postId: number) => {
  const url = `/posts/${postId}`;
  const response = customAxios.delete(url);

  return response.then((res: AxiosResponse) => res.data);
};

export const useDeletePostMutation = (postId: number) => {
  const { mutate, isError, isLoading } = useMutation(() => deletePost(postId));

  return { mutate, isError, isLoading };
};
