import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { Comment } from "@types";
import { AxiosResponse } from "axios";

import { customAxios } from "@/api/CustomAxios";

const fetchComments = (
  postId: string | undefined,
  pageParam: number
): Promise<Comment> => {
  const response = customAxios.get(
    `/posts/${postId}/comments?page=${pageParam}&perPage=25`
  );
  return response.then((res: AxiosResponse<Comment>) => res.data);
};

export const useGetCommentQuery = (postId?: string) => {
  return useInfiniteQuery<Comment>(
    ["comments", postId],
    ({ pageParam = 0 }) => fetchComments(postId, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.paginationInfo.last
          ? undefined
          : lastPage.paginationInfo.pageNum + 1;
      },
    }
  );
};

interface PostCommentData {
  postId: number;
  contents: string;
  isAnonymous: boolean;
  isReadOnlyAuthor: boolean;
}

interface PostResData {
  message?: string;
}

const postComment = async (postData: PostCommentData): Promise<PostResData> => {
  const response = customAxios.post("/comments", postData);
  return response.then((res: AxiosResponse<PostResData>) => res.data);
};

export const usePostCommentMutation = (postId?: string) => {
  return useMutation(postComment);
};

interface PutCommentData {
  contents: string;
  isReadOnlyAuthor: boolean;
}

// 댓글 수정
const putComment = async (param: {
  commentId: number;
  putCommentData: PutCommentData;
}) => {
  return customAxios.put(`/comments/${param.commentId}`, param.putCommentData);
};

export const usePutCommentMutation = (postId?: string) => {
  return useMutation(
    (param: { commentId: number; putCommentData: PutCommentData }) =>
      putComment(param)
  );
};

const deleteComment = async (commentId: number) => {
  const response = customAxios.delete(`/comments/${commentId}`);
  return response.then((res: AxiosResponse) => res.data);
};

export const useDeleteCommentMutation = (postId?: string) => {
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

export const usePostReplyMutation = (postId?: string) => {
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

export const usePutReplyMutation = (postId?: string) => {
  return useMutation(
    (param: { replyId: number; putReplyData: PutCommentData }) =>
      putReply(param)
  );
};

const deleteReply = async (replyId: number) => {
  const response = customAxios.delete(`/reply/${replyId}`);
  return response.then((res: AxiosResponse) => res.data);
};

export const useDeleteReplyMutation = (postId?: string) => {
  return useMutation((replyId: number) => deleteReply(replyId));
};
