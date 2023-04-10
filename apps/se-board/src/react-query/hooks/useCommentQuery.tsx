import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

interface resData {
  pagenationInfo: {
    contentSize: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  };
  data: {
    commentId: number;
    author: {
      userId: string;
      name: string;
    };
    createdAt: string;
    modifiedAt: string;
    contents: string;
    isEditable: boolean;
    subComments: {
      commentId: number;
      tag: number;
      author: {
        userId: string;
        name: string;
      };
      createdAt: string;
      modifiedAt: string;
      contents: string;
      isEditable: boolean;
    }[];
  }[];
}

const fetchComments = (
  postId: string | undefined,
  page: number,
  perPage: number
): Promise<resData> => {
  const response = axios.get(
    `/post/${postId}/comments?page=${page}&perPage=${perPage}`
  );
  return response.then((res: AxiosResponse<resData>) => res.data);
};

export const useGetCommentQuery = (
  postId: string | undefined,
  page: number,
  perPage: number
) => {
  return useQuery<resData>(["comments", postId], () =>
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
