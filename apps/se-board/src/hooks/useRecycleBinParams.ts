import { useSearchParams } from "react-router-dom";

export const useRecycleBinParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getPage = () => {
    const page = Number(searchParams.get("page"));

    if (Number.isInteger(page) && page > 0) {
      return page;
    }

    return 0;
  };

  const getClassification = () => {
    const classification = searchParams.get("classification");

    if (classification) {
      return classification;
    }

    return "";
  };

  return {
    page: getPage(),
    classification: getClassification(),
    setPageSearchParam(page: number) {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    },
    setClassificationSearchParam(classification: string) {
      searchParams.set("classification", classification);
      searchParams.set("page", "0");
      setSearchParams(searchParams);
    },
  };
};
