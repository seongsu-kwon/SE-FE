import { useEffect, useState } from "react";

export const usePagination = (
  totalItems: number,
  perPage: number,
  option: {
    current?: number;
    onChange?: (page: number) => void;
  } = { current: 0 }
) => {
  const [currentPage, setCurrentPage] = useState(option.current!);
  const [totalPages, setTotalPages] = useState(0);
  const onChangePage = (page: number) => {
    setCurrentPage(page);
    if (option.onChange) option.onChange(page);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / perPage));
  }, [totalItems, perPage]);

  useEffect(() => {
    if (totalPages === 0) return;
    if (currentPage > totalPages) setCurrentPage(totalPages - 1);
  }, [currentPage]);

  return { currentPage, totalPages, onChangePage };
};
