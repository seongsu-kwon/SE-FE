import { useState } from "react";

export const usePagination = (
  totalItems: number,
  perPage: number,
  option: {
    current?: number;
    onChange?: (page: number) => void;
  } = { current: 0 }
) => {
  const [currentPage, setCurrentPage] = useState(option.current!);
  const totalPages = Math.ceil(totalItems / perPage);
  const onChangePage = (page: number) => {
    setCurrentPage(page);
    option.onChange && option.onChange(page);
  };
  return { currentPage, totalPages, onChangePage };
};
