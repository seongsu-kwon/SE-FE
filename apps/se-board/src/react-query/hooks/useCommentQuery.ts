import { useMutation, useQuery } from "@tanstack/react-query";
import { Comment } from "@types";
import { AxiosResponse } from "axios";

import { customAxios } from "@/api/CustomAxios";

const fetchComments = (
  postId: string | undefined,
  page: number,
  perPage: number
): Promise<Comment> => {
  const response = customAxios.get(`/posts/${postId}/comments`);
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
  readOnlyAuthor: boolean;
}

interface PostResData {
  message?: string;
}

const postComment = async (postData: PostCommentData): Promise<PostResData> => {
  const response = customAxios.post("/comments", postData);
  return response.then((res: AxiosResponse<PostResData>) => res.data);
};

export const usePostCommentMutation = () => {
  return useMutation(postComment);
};

interface PutCommentData {
  contents: string;
  readOnlyAuthor: boolean;
}

// 댓글 수정
const putComment = async (param: {
  commentId: number;
  putCommentData: PutCommentData;
}) => {
  return customAxios.put(`/comments/${param.commentId}`, param.putCommentData);
};

export const usePutCommentMutation = () => {
  return useMutation(
    (param: { commentId: number; putCommentData: PutCommentData }) =>
      putComment(param)
  );
};

const deleteComment = async (commentId: number) => {
  const response = customAxios.delete(`/comments/${commentId}`);
  return response.then((res: AxiosResponse) => res.data);
};

export const useDeleteCommentMutation = () => {
  return useMutation((commentId: number) => deleteComment(commentId));
};

interface PostReplyData {
  postId: number;
  superCommentId: number;
  tagCommentId: number;
  contents: string;
  anonymous: boolean;
  readOnlyAuthor: boolean;
}

const postReply = async (postReplyData: PostReplyData) => {
  // 답글 작성
  const response = customAxios.post("/reply", postReplyData);
  return response.then((res: AxiosResponse) => res.data);
};

export const usePostReplyMutation = () => {
  return useMutation(postReply);
};

const putReply = async (param: {
  replyId: number;
  putReplyData: PutCommentData;
}) => {
  // 답글 수정
  const response = customAxios.put(
    `/reply/${param.replyId}`,
    param.putReplyData
  );
  return response.then((res: AxiosResponse) => res.data);
};

export const usePutReplyMutation = () => {
  return useMutation(
    (param: { replyId: number; putReplyData: PutCommentData }) =>
      putReply(param)
  );
};

const deleteReply = async (replyId: number) => {
  const response = customAxios.delete(`/reply/${replyId}`);
  return response.then((res: AxiosResponse) => res.data);
};

export const useDeleteReplyMutation = () => {
  return useMutation((replyId: number) => deleteReply(replyId));
};
