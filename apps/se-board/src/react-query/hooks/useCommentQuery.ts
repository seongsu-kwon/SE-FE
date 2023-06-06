import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { Comment, PutCommentData } from "@types";

import {
  deleteComment,
  deleteCommentList,
  deleteReply,
  fetchComments,
  getAdminComments,
  postComment,
  postReply,
  putComment,
  putReply,
} from "@/api/comment";
import { errorHandle } from "@/utils/errorHandling";

export const useGetCommentQuery = (postId?: string) => {
  return useInfiniteQuery(
    ["comments", postId],
    ({ pageParam = 0 }) => fetchComments(postId, pageParam),
    {
      getNextPageParam: (lastPage: Comment) => {
        return lastPage.paginationInfo.last
          ? undefined
          : lastPage.paginationInfo.pageNum + 1;
      },
    }
  );
};

export const usePostCommentMutation = (postId?: string) => {
  return useMutation(postComment);
};

export const usePutCommentMutation = (postId?: string) => {
  return useMutation(
    (param: { commentId: number; putCommentData: PutCommentData }) =>
      putComment(param)
  );
};

export const useDeleteCommentMutation = (postId?: string) => {
  return useMutation((commentId: number) => deleteComment(commentId));
};

export const usePostReplyMutation = (postId?: string) => {
  return useMutation(postReply);
};

export const usePutReplyMutation = (postId?: string) => {
  return useMutation(
    (param: { replyId: number; putReplyData: PutCommentData }) =>
      putReply(param)
  );
};

export const useDeleteReplyMutation = (postId?: string) => {
  return useMutation((replyId: number) => deleteReply(replyId));
};

export const useGetAdminCommmentQuery = (
  page?: number,
  perPage?: number,
  isReadOnlyAuthor?: boolean,
  isReported?: boolean
) => {
  return useQuery(
    ["adminComments"],
    () => getAdminComments(page, perPage, isReadOnlyAuthor, isReported),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};

export const useDeleteCommentListMutation = () => {
  return useMutation(
    (commentIdList: number[]) => deleteCommentList(commentIdList),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};
