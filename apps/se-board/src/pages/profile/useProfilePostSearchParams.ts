import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useProfilePostSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    page: 0,
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

  return {
    ...params,
    setPageSearchParam(page: number) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    },

    deletePageParam() {
      searchParams.delete("page");
      setSearchParams(searchParams);
    },
  };
};
