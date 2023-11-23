import { useSearchParams } from "react-router-dom";

const SEARCH_OPTIONS = ["ALL", "CONTENT", "AUTHOR"];

export const useCommentSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getPage = () => {
    const page = Number(searchParams.get("page"));

    if (Number.isInteger(page) && page > 0) {
      return page;
    }

    return 0;
  };

  const getSearchOption = () => {
    const option = searchParams.get("searchOption");

    if (option && SEARCH_OPTIONS.includes(option)) {
      return option;
    }

    return "";
  };

  const getQuery = () => {
    return searchParams.get("query") ?? "";
  };

  const getIsReported = () => {
    if (searchParams.get("isReported") === "true") {
      return true;
    } else if (searchParams.get("isReported") === "false") {
      return false;
    }

    return null;
  };

  const getIsReadOnlyAuthor = () => {
    console.log(searchParams.get("isReadOnlyAuthor"));
    if (searchParams.get("isReadOnlyAuthor") === "true") {
      return true;
    } else if (searchParams.get("isReadOnlyAuthor") === "false") {
      return false;
    }

    return null;
  };

  return {
    page: getPage(),
    searchOption: getSearchOption(),
    query: getQuery(),
    isReported: getIsReported(),
    isReadOnlyAuthor: getIsReadOnlyAuthor(),
    setPageSearchParam(page: number) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    },
    setSearchOptionAndQuery(option: string, query: string) {
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
    setClassific(
      isReadOnlyAuthor: boolean | undefined,
      isReported: boolean | undefined
    ) {
      if (isReadOnlyAuthor === undefined && isReported === undefined) {
        searchParams.delete("isReadOnlyAuthor");
        searchParams.delete("isReported");
        searchParams.set("page", "0");
        searchParams.delete("searchOption");
        searchParams.delete("query");
        setSearchParams(searchParams);
      } else if (isReadOnlyAuthor !== undefined && isReported === undefined) {
        searchParams.set("isReadOnlyAuthor", isReadOnlyAuthor.toString());
        searchParams.set("page", "0");
        searchParams.delete("searchOption");
        searchParams.delete("query");
        searchParams.delete("isReported");
        setSearchParams(searchParams);
      } else if (isReadOnlyAuthor === undefined && isReported !== undefined) {
        searchParams.set("isReported", isReported.toString());
        searchParams.set("page", "0");
        searchParams.delete("searchOption");
        searchParams.delete("query");
        searchParams.delete("isReadOnlyAuthor");
        setSearchParams(searchParams);
      }
    },
  };
};
