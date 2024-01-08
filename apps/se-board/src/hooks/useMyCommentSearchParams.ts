/*
 * 마이페이지 - 작성한 댓글 페이지를 위한 훅
 */

import { useSearchParams } from "react-router-dom";

const SEARCH_OPTIONS = [
  "ALL",
  "TITLE",
  "CONTENT",
  "TITLE_OR_CONTENT",
  "AUTHOR",
];

export const useMyCommentSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 페이지
  const getPage = () => {
    const page = Number(searchParams.get("page"));
    if (Number.isInteger(page) && page > 0) {
      return page;
    }
    return 0;
  };

  return {
    page: getPage(),
    setPageSearchParam(page: number) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    },
  };
};
