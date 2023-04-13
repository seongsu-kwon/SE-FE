import { useMutation, useQuery } from "@tanstack/react-query";
import { Comment } from "@types";
import axios, { AxiosResponse } from "axios";

const fetchComments = (
  postId: string | undefined,
  page: number,
  perPage: number
): Promise<Comment> => {
  const response = axios.get(
    `/post/${postId}/comments?page=${page}&perPage=${perPage}`
  );
  return response.then((res: AxiosResponse<Comment>) => res.data);
};

export const useGetCommentQuery = (
  postId: string | undefined,
  page: number,
  perPage: number
) => {
  return useQuery<Comment>(["comments", postId], () =>
    fetchComments(postId, page, perPage)
  );
};

interface postCommentData {
  postId: number;
  contents: string;
  isAnonymous: boolean;
}

interface postResData {
  message?: string;
}

const postComment = (postData: postCommentData): Promise<postResData> => {
  const response = axios.post("/comments", postData);
  return response.then((res: AxiosResponse<postResData>) => res.data);
};

export const usePostCommentMutation = () => {
  return useMutation(postComment);
};
