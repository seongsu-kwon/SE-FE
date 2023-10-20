import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { CommentsData, PutCommentData } from "@types";

import {
  deleteComment,
  deleteCommentList,
  deleteReply,
  fetchComments,
  getAdminComments,
  getDeletedComments,
  permanentlyDeleteComments,
  postComment,
  postReply,
  putComment,
  putReply,
  restoreComments,
} from "@/api/comment";
import { errorHandle } from "@/utils/errorHandling";

export const useGetCommentQuery = (postId?: string) => {
  return useInfiniteQuery(
    ["comments", postId],
    ({ pageParam = 0 }) => fetchComments(postId, pageParam),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 6,
      getNextPageParam: (lastPage: CommentsData) => {
        return lastPage.paginationInfo.last
          ? undefined
          : lastPage.paginationInfo.pageNum + 1;
      },
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};

export const usePostCommentMutation = (postId?: string) => {
  return useMutation(postComment, {
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const usePutCommentMutation = (postId?: string) => {
  return useMutation(
    (param: { commentId: number; putCommentData: PutCommentData }) =>
      putComment(param)
  );
};

export const useDeleteCommentMutation = (postId?: string) => {
  return useMutation((commentId: number) => deleteComment(commentId), {
    onError: (err) => {
      errorHandle(err);
    },
  });
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
  return useMutation((replyId: number) => deleteReply(replyId), {
    onError: (err) => {
      errorHandle(err);
    },
  });
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

export const useGetDeleteCommentsQuery = (page?: number, perPage?: number) => {
  return useQuery(
    ["deleteComments", page, perPage],
    () => getDeletedComments(page, perPage),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 61,
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};

export const usePostRestoreCommentsQuery = () => {
  return useMutation((commentIds: number[]) => restoreComments(commentIds), {
    onError: (err) => {
      errorHandle(err);
    },
  });
};

export const usePermanentlyDeleteCommentsQuery = () => {
  return useMutation(
    (commentIds: number[]) => permanentlyDeleteComments(commentIds),
    {
      onError: (err) => {
        errorHandle(err);
      },
    }
  );
};
