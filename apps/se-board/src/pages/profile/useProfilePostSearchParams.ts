import { useSearchParams } from "react-router-dom";

export const useProfilePostSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 페이지
  const getPage = () => {
    const page = Number(searchParams.get("page"));
    if (Number.isInteger(page) && page > 0) {
      return page;
    }
    return 0;
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
    query: getQuery(),
    category: getCategory(),
    setPageSearchParam(page: number) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
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
