import {
  Comment,
  PostCommentData,
  PostReplyData,
  PutCommentData,
} from "@types";

import { HTTP_METHODS } from ".";
import { _axios } from "./axiosInstance";

export const fetchComments = (
  postId: string | undefined,
  pageParam: number
) => {
  return _axios<Comment>({
    url: `/posts/${postId}/comments?page=${pageParam}&perPage=25`,
    method: HTTP_METHODS.GET,
  }).then((res) => res.data);
};

export const postComment = async (postData: PostCommentData) => {
  return _axios({
    url: "/comments",
    method: HTTP_METHODS.POST,
    data: postData,
  }).then((res) => res.data);
};

export const putComment = async (param: {
  commentId: number;
  putCommentData: PutCommentData;
}) => {
  return _axios({
    url: `/comments/${param.commentId}`,
    method: HTTP_METHODS.PUT,
    data: param.putCommentData,
  });
};

export const deleteComment = async (commentId: number) => {
  return _axios({
    url: `/comments/${commentId}`,
    method: HTTP_METHODS.DELETE,
  });
};

export const postReply = async (postReplyData: PostReplyData) => {
  // 답글 작성
  return _axios({
    url: "/reply",
    method: HTTP_METHODS.POST,
    data: postReplyData,
  });
};

export const putReply = async (param: {
  replyId: number;
  putReplyData: PutCommentData;
}) => {
  // 답글 수정
  return _axios({
    url: `/reply/${param.replyId}`,
    method: HTTP_METHODS.PUT,
    data: param.putReplyData,
  });
};

export const deleteReply = async (replyId: number) => {
  return _axios({
    url: `/reply/${replyId}`,
    method: HTTP_METHODS.DELETE,
  });
};
