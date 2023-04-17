import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

interface resData {
  postId: number;
  title: string;
  author: {
    loginId: string;
    name: string;
  };
  views: number;
  category: {
    mainCategory: string;
    subCategory: string;
  };
  createdAt: string;
  modifiedAt: string;
  contents: string;
  isBookmarked: boolean;
  isEditable: boolean;
  attachments: any; // 첨부파일 정보 확정 후 수정 필요
}

const fetchGetPost = (postId: string | undefined): Promise<resData> => {
  const response = axios.get(`/posts/${postId}`);
  return response.then((res: AxiosResponse<resData>) => res.data);
};

export const useGetPostQuery = (postId: string | undefined) => {
  return useQuery<resData>(["post", postId], () => fetchGetPost(postId));
};
