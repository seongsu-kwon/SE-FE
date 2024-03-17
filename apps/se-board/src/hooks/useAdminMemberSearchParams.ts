import { useSearchParams } from "react-router-dom";

const SEARCH_OPTIONS = [
  "ALL",
  "TITLE",
  "CONTENT",
  "TITLE_OR_CONTENT",
  "AUTHOR",
];

export const useAdminMemberSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 페이지
  const getPage = () => {
    const page = Number(searchParams.get("page"));
    if (Number.isInteger(page) && page > 0) {
      return page;
    }
    return 0;
  };

  // 검색 옵션
  const getSearchOption = () => {
    const option = searchParams.get("searchOption");
    if (option && SEARCH_OPTIONS.includes(option)) {
      return option;
    }
    return "";
  };

  // 검색어
  const getQuery = () => {
    return searchParams.get("query") ?? "";
  };

  const getCategory = () => {
    return searchParams.get("category") ?? "";
  };

  return {
    page: getPage(),
    searchOption: getSearchOption(),
    query: getQuery(),
    category: getCategory(),
    setPageSearchParam(page: number) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    },
    search(option: string, query: string) {
      if (query === "") {
        searchParams.delete("searchOption");
        searchParams.delete("query");
        setSearchParams(searchParams);
      } else if (!SEARCH_OPTIONS.includes(option)) {
        searchParams.set("searchOption", "ALL");
        searchParams.set("query", query);
        searchParams.set("page", "0");
        setSearchParams(searchParams);
      } else {
        searchParams.set("searchOption", option);
        searchParams.set("query", query);
        searchParams.set("page", "0");
        setSearchParams(searchParams);
      }
    },
    changeCategory(category: string) {
      searchParams.set("category", category);
      searchParams.set("page", "0");
      searchParams.delete("searchOption");
      searchParams.delete("query");
      setSearchParams(searchParams);
    },
    deleteCategory() {
      searchParams.delete("category");
      searchParams.set("page", "0");
      searchParams.delete("searchOption");
      searchParams.delete("query");
      setSearchParams(searchParams);
    },
  };
};
