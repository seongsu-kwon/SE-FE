import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostDetail, PostPut } from "@types";
import axios, { AxiosResponse } from "axios";

const fetchGetPost = async (
  postId: string | undefined
): Promise<PostDetail> => {
  const response = axios.get(
    `https://4230704f-261a-4d33-9438-f49a652a7f3f.mock.pstmn.io/post/${postId}`
  );
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

const bookmarkPost = async (postId: number) => {
  const url = `/posts/${postId}/bookmark`;
  const response = axios.post(url);

  return response.then((res: AxiosResponse) => res.data);
};

export const useBookmarkPostMutation = (postId: number) => {
  return useMutation(() => bookmarkPost(postId));
};

const bookmarkDelete = async (postId: number) => {
  const url = `/posts/${postId}/bookmark`;
  const response = axios.delete(url);

  return response.then((res: AxiosResponse) => res.data);
};

export const useBookmarkDeleteMutation = (postId: number) => {
  const queryClient = useQueryClient();
  const { mutate, data, isError, isLoading } = useMutation(() =>
    bookmarkDelete(postId)
  );
  return { mutate, data, isError, isLoading };
};
