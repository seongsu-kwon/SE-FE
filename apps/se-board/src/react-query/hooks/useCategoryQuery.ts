import { useQuery } from "@tanstack/react-query";
import { Category } from "@types";
import { AxiosResponse } from "axios";

import { customAxios } from "@/api/CustomAxios";

const getCategory = async (menuId: number): Promise<Category> => {
  const response = customAxios.get(`/menu/${43214231}`);
  return response.then((res: AxiosResponse) => res.data);
};

export const useGetCategoryQuery = (menuId: number) => {
  return useQuery(["category", menuId], () => getCategory(menuId));
};
