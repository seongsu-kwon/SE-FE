import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PostListItem } from "@types";
import { useState } from "react";

import {
  convertPostListItemDTOToPostListItem,
  fetchPinedPostList,
  fetchPostList,
  searchPost,
} from "@/api/post";
import { usePostSearchParams } from "@/hooks/usePostSearchParams";

import { queryKeys } from "../queryKeys";

export const useFetchPostList = ({
  categoryId,
  perPage = 0,
  page = 0,
  searchOption,
  query,
}: {
  categoryId: number;
  perPage?: number;
  page?: number;
  searchOption?: string;
  query?: string;
}) => {
  const [posts, setPosts] = useState<{
    pinedPostList: PostListItem[];
    postList: PostListItem[];
  }>({ pinedPostList: [], postList: [] });
  const [totalItems, setTotalItems] = useState(0);
  const { setPageSearchParam } = usePostSearchParams();

  const { isLoading: pinedPostlistLoading } = useQuery(
    [queryKeys.pinedPostList, categoryId],
    () => fetchPinedPostList(categoryId),
    {
      enabled: !!categoryId,
      onSuccess: (res) => {
        const list = res.data.map((v) =>
          convertPostListItemDTOToPostListItem(v)
        );
        setPosts((prev) => ({ ...prev, pinedPostList: list }));
      },
    }
  );

  const { isLoading: postListLoading } = useQuery(
    [queryKeys.postList, categoryId, perPage, page],
    () =>
      fetchPostList({
        categoryId,
        perPage,
        page,
      }),
    {
      enabled: !!categoryId && !!perPage && searchOption === "" && query === "",
      onSuccess: (res) => {
        const list = res.data.content
          .map((v) => convertPostListItemDTOToPostListItem(v))
          .map((v) => ({ ...v, pined: false }));
        setPosts((prev) => ({ ...prev, postList: list }));
        setTotalItems(res.data.totalElements);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: searchPostListLoading } = useQuery(
    [queryKeys.postList, categoryId, perPage, page, searchOption, query],
    () =>
      searchPost({
        categoryId,
        perPage,
        page: page,
        searchOption: searchOption!,
        query: query!,
      }),
    {
      enabled: searchOption !== "" && query !== "",
      onSuccess: (res) => {
        const list = res.data.content
          .map((v) => convertPostListItemDTOToPostListItem(v))
          .map((v) => ({ ...v, pined: false }));

        setPosts((prev) => ({ ...prev, postList: list }));
        setTotalItems(res.data.totalElements);
      },
      refetchOnWindowFocus: false,
    }
  );

  return {
    postList: [...posts.pinedPostList, ...posts.postList],
    isLoading:
      searchOption === "" && query === ""
        ? pinedPostlistLoading || postListLoading
        : pinedPostlistLoading || searchPostListLoading,
    totalItems,
  };
};

export const useFetchInfinitePostList = ({
  categoryId,
  perPage,
  page = 0,
}: {
  categoryId: number;
  perPage?: number;
  page?: number;
}) => {
  return useInfiniteQuery(
    ["asdfasdf"],
    ({ pageParam = page }) =>
      fetchPostList({
        categoryId: categoryId,
        perPage: perPage,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) => {
        const { number, totalPages } = lastPage.data;
        return number + 1 < totalPages ? number + 1 : undefined;
      },
      select: (data) => {
        return {
          ...data,
          pages: data.pages.map((v) => ({
            ...v,
            data: {
              ...v.data,
              content: v.data.content.map((item) =>
                convertPostListItemDTOToPostListItem(item)
              ),
            },
          })),
        };
      },
    }
  );
};
