import { useQuery } from "@tanstack/react-query";
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
  page?: number,
  query?: number
): Promise<resData> => {
  const response = axios.get(
    `/post/${postId}/comments?page=${page}&query=${query}`
  );
  return response.then((res: AxiosResponse<resData>) => res.data);
};

export const useGetCommentQuery = (
  postId: string | undefined,
  page?: number,
  query?: number
) => {
  return useQuery<resData>(["comments", postId], () =>
    fetchComments(postId, page, query)
  );
};
