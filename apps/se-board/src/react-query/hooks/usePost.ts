import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  convertPostListItemDTOToPostListItem,
  fetchPinedPostList,
  fetchPostList,
} from "@/api/post";
import {
  pinedPostListState,
  postListState,
  postPaginationState,
} from "@/store/post";

import { queryKeys } from "../queryKeys";

export const useFetchPostList = ({
  categoryId,
  perPage,
  page = 0,
}: {
  categoryId: number;
  perPage?: number;
  page?: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPageiation] = useRecoilState(postPaginationState);
  const setPostList = useSetRecoilState(postListState);
  const setPinedPostList = useSetRecoilState(pinedPostListState);
  const client = useQueryClient();
  const { isLoading: pinedPostlistLoading } = useQuery(
    [queryKeys.pinedPostList, categoryId],
    () => fetchPinedPostList(categoryId),
    {
      enabled: !!categoryId,
      onSuccess: (res) => {
        const list = res.data.map((v) =>
          convertPostListItemDTOToPostListItem(v)
        );
        setPinedPostList(list);
      },
      keepPreviousData: true,
    }
  );

  const { data, isLoading: postListLoading } = useQuery(
    [queryKeys.postList, categoryId, perPage, pagination.currentPage],
    () =>
      fetchPostList({
        categoryId,
        perPage: pagination.perPage,
        page: pagination.currentPage,
      }),
    {
      enabled: !!categoryId && !!perPage,
      onSuccess: (res) => {
        const list = res.data.content
          .map((v) => convertPostListItemDTOToPostListItem(v))
          .map((v) => ({ ...v, pined: false }));
        setPostList(list);
      },
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (
      !searchParams.has("page") ||
      !Number.isInteger(Number(searchParams.get("page")))
    ) {
      setPageiation((prev) => ({ ...prev, currentPage: 0 }));
    } else {
      const page = Number(searchParams.get("page"));
      if (page <= 0) {
        setPageiation((prev) => ({ ...prev, currentPage: 0 }));
      } else if (page > data?.data.totalPages!) {
        const p = data?.data.totalPages! - 1;
        console.log(p);
        setPageiation((prev) => ({ ...prev, currentPage: p }));
      } else {
        setPageiation((prev) => ({ ...prev, currentPage: page - 1 }));
      }
    }
  }, [searchParams.get("page"), data?.data.totalPages]);

  useEffect(() => {
    client.invalidateQueries([queryKeys.postList, categoryId]);
  }, [categoryId]);

  return {
    isLoading: pinedPostlistLoading || postListLoading,
    totalPages: data?.data.totalPages,
    totalItems: data?.data.totalElements,
    onChangePage: (page: number) => {
      setPageiation((prev) => ({ ...prev, currentPage: page }));
      searchParams.set("page", (page + 1).toString());
      setSearchParams(searchParams);
      window.scrollTo(0, 0);
    },
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
