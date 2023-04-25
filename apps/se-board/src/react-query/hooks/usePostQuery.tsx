import { useMutation, useQuery } from "@tanstack/react-query";
import { PostDetail, PostPut } from "@types";
import axios, { AxiosResponse } from "axios";

const fetchGetPost = async (
  postId: string | undefined
): Promise<PostDetail> => {
  const response = axios.get(`/posts/${postId}`);
  return response.then((res: AxiosResponse<PostDetail>) => res.data);
};

export const useGetPostQuery = (postId: string | undefined) => {
  return useQuery<PostDetail>(["post", postId], () => fetchGetPost(postId));
};

const putPost = async (postId: number, data: PostPut) => {
  const url = `/posts/${postId}`;
  const response = axios.put(url, data);

  return response.then((res: AxiosResponse) => res.data);
};

export const usePutPostMutation = (postId: number, data: PostPut) => {
  return useMutation(() => putPost(postId, data));
};
