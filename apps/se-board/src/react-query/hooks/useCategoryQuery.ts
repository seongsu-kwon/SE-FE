import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { customAxios } from "@/api/CustomAxios";

const getCategory = async (mainCategoryId: number) => {
  const response = customAxios.get(`/category/${mainCategoryId}`);
  return response.then((res: AxiosResponse) => res.data);
};

export const useGetCategoryQuery = (mainCategoryId: number) => {
  return useQuery(["category", mainCategoryId], () =>
    getCategory(mainCategoryId)
  );
};
