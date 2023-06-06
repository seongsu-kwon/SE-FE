import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SEARCH_OPTIONS = [
  "ALL",
  "TITLE",
  "CONTENT",
  "TITLE_OR_CONTENT",
  "AUTHOR",
];

export const usePostSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    page: 0,
    searchOption: "",
    query: "",
  });

  useEffect(() => {
    const page = Number(searchParams.get("page"));
    if (Number.isInteger(page) && page > 0) {
      console.log("page : ", page);

      setParams((prev) => ({ ...prev, page: page - 1 }));
    } else {
      setParams((prev) => ({ ...prev, page: 0 }));
    }
  }, [searchParams.get("page")]);

  useEffect(() => {
    const option = searchParams.get("searchOption");

    if (option && SEARCH_OPTIONS.includes(option)) {
      setParams((prev) => ({
        ...prev,
        searchOption: option,
        page: 0,
      }));
    }
  }, [searchParams.get("searchOption")]);

  useEffect(() => {
    if (searchParams.has("query")) {
      setParams((prev) => ({
        ...prev,
        query: searchParams.get("query") ?? "",
        page: 0,
      }));
    }
  }, [searchParams.get("query")]);

  return {
    ...params,
    setPageSearchParam(page: number) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    },
    setSearchOptionParam(option: string) {
      searchParams.set("searchOption", option);
      setSearchParams(searchParams);
    },
    setQueryParam(query: string) {
      searchParams.set("query", query);
      setSearchParams(searchParams);
    },
    deletePageParam() {
      searchParams.delete("page");
      setSearchParams(searchParams);
    },
    deleteSearchOptionParam() {
      searchParams.delete("searchOption");
      setSearchParams(searchParams);
    },
    deleteQueryParam() {
      searchParams.delete("query");
      setSearchParams(searchParams);
    },
  };
};
