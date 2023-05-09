import {
  FetchPostListParams,
  FetchPostListResponse,
  PostListItem,
  PostListItemDTO,
} from "@types";
import { PostCreate, PostCreateRes, PostDetail, PostPut } from "@types";

import { HTTP_METHODS } from ".";
import { _axios } from "./axiosInstance";

export const fetchPostList = ({
  categoryId,
  page,
  perPage,
}: FetchPostListParams) => {
  return _axios<FetchPostListResponse>({
    url: `/posts`,
    method: HTTP_METHODS.GET,
    params: {
      categoryId,
      page,
      perPage,
    },
  });
};

export const fetchPinedPostList = (categoryId: number) => {
  return _axios<PostListItemDTO[]>({
    url: `/posts/pined`,
    method: HTTP_METHODS.GET,
    params: {
      categoryId,
    },
  });
};

//----- converter -----
export const convertPostListItemDTOToPostListItem = (
  postListItemDTO: PostListItemDTO
): PostListItem => {
  return {
    postId: postListItemDTO.postId,
    title: postListItemDTO.title,
    author: postListItemDTO.author,
    views: postListItemDTO.views,
    category: postListItemDTO.category,
    createdDateTime: postListItemDTO.createdAt,
    modifiedDateTime: postListItemDTO.modifiedAt,
    hasAttachment: postListItemDTO.hasAttachment,
    commentSize: postListItemDTO.commentSize,
    pined: postListItemDTO.pined,
  };
};

export const fetchGetPost = async (postId: string | undefined) => {
  return _axios({
    url: `/posts/${postId}`,
    method: HTTP_METHODS.GET,
  }).then((res) => res.data as PostDetail);
};

export const postPost = async (reqBody: PostCreate) => {
  return _axios<PostCreateRes>({
    url: "/posts",
    method: HTTP_METHODS.POST,
    data: reqBody,
  }).then((res) => res.data);
};

export const putPost = async (postId: number, data: PostPut) => {
  return _axios<PostCreateRes>({
    url: `/posts/${postId}`,
    method: HTTP_METHODS.PUT,
    data: data,
  }).then((res) => res.data);
};

export const bookmarkPost = async (postId: number) => {
  return _axios({
    url: `/posts/${postId}/bookmark`,
    method: HTTP_METHODS.POST,
  });
};

export const bookmarkDelete = async (postId: number) => {
  return _axios({
    url: `/posts/${postId}/bookmark`,
    method: HTTP_METHODS.DELETE,
  });
};

export const deletePost = async (postId: number) => {
  return _axios({
    url: `/posts/${postId}`,
    method: HTTP_METHODS.DELETE,
  });
};

export const secretPost = async (postId: number, password: string) => {
  return _axios<PostDetail>({
    url: `/posts/${postId}/auth`,
    method: HTTP_METHODS.POST,
    data: {
      password: password,
    },
  }).then((res) => res.data);
};
