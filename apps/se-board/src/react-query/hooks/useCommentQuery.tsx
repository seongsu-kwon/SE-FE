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
  page: number = 1,
  perPage: number = 25
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

const postComment = async (postData: postCommentData): Promise<postResData> => {
  const response = axios.post("/comments", postData);
  const res = await response;
  return res.data;
};

export const usePostCommentMutation = () => {
  return useMutation(postComment);
};

interface putCommentData {
  contents: string;
}

interface putResData {
  message: string;
}

const putComment = async (
  commentId: number,
  putCommentData: putCommentData
): Promise<putResData> => {
  const response = axios.put<putResData>(
    `/comments/${commentId}`,
    putCommentData
  );
  const res = await response;
  return res.data;
};

export const usePutCommentMutation = (
  commentId: number,
  putCommentData: putCommentData
) => {
  return useMutation(() => putComment(commentId, putCommentData));
};
