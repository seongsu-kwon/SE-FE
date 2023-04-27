import { useMutation, useQuery } from "@tanstack/react-query";
import { Comment } from "@types";
import axios, { AxiosResponse } from "axios";

const fetchComments = (
  postId: string | undefined,
  page: number,
  perPage: number
): Promise<Comment> => {
  const response = axios.get(
    `https://4230704f-261a-4d33-9438-f49a652a7f3f.mock.pstmn.io/post/${postId}/comments`
  );
  return response.then((res: AxiosResponse<Comment>) => res.data);
};

export const useGetCommentQuery = (
  postId: string | undefined,
  page: number,
  perPage: number = 25
) => {
  return useQuery<Comment>(["comments", postId], () =>
    fetchComments(postId, page, perPage)
  );
};

interface PostCommentData {
  postId: number;
  contents: string;
  isAnonymous: boolean;
}

interface PostResData {
  message?: string;
}

const postComment = async (postData: PostCommentData): Promise<PostResData> => {
  const response = axios.post("/comments", postData);
  const res = await response;
  return res.data;
};

export const usePostCommentMutation = () => {
  return useMutation(postComment);
};

interface PutCommentData {
  contents: string;
}

interface PutResData {
  message: string;
}

const putComment = async (
  commentId: number,
  putCommentData: PutCommentData
): Promise<PutResData> => {
  const response = axios.put<PutResData>(
    `/comments/${commentId}`,
    putCommentData
  );
  const res = await response;
  return res.data;
};

export const usePutCommentMutation = (
  commentId: number,
  putCommentData: PutCommentData
) => {
  return useMutation(() => putComment(commentId, putCommentData));
};
