import { Button, HStack, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

const getPages = (
  currentGroup: number,
  totalPage: number,
  viewPage: number
) => {
  const result = [];
  if ((currentGroup + 1) * viewPage > totalPage) {
    for (let i = currentGroup * viewPage; i < totalPage; i++) {
      result.push(i);
    }
  } else {
    for (let i = 0; i < viewPage; i++) {
      result.push(currentGroup * viewPage + i);
    }
  }
  return result;
};

interface PaignationProps {
  currentPage: number;
  totalPage: number;
  viewPage?: number;
  onChangePage: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPage,
  viewPage = 10,
  onChangePage,
}: PaignationProps) => {
  const [pageGroup, setPageGroup] = useState<{
    currentGroup: number;
    lastGroup: number;
    pages: number[];
  }>({
    currentGroup: 0,
    lastGroup: Math.ceil(totalPage / viewPage) - 1,
    pages: getPages(0, totalPage, viewPage),
  });

  const toFirstPageGroup = () => {
    setPageGroup((prev) => ({
      ...prev,
      currentGroup: 0,
      pages: getPages(0, totalPage, viewPage),
    }));
    onChangePage(0);
  };

  const toLastPageGroup = () => {
    setPageGroup((prev) => ({
      ...prev,
      currentGroup: prev.lastGroup,
      pages: getPages(prev.lastGroup, totalPage, viewPage),
    }));
    onChangePage(pageGroup.lastGroup * viewPage);
  };

  const toPrevPageGroup = () => {
    if (pageGroup.currentGroup === 0) return;
    setPageGroup((prev) => ({
      ...prev,
      currentGroup: prev.currentGroup - 1,
      pages: getPages(prev.currentGroup - 1, totalPage, viewPage),
    }));
    onChangePage((pageGroup.currentGroup - 1) * viewPage);
  };

  const toNextPageGroup = () => {
    if (pageGroup.currentGroup === pageGroup.lastGroup) return;

    setPageGroup((prev) => ({
      ...prev,
      currentGroup: prev.currentGroup + 1,
      pages: getPages(prev.currentGroup + 1, totalPage, viewPage),
    }));

    onChangePage((pageGroup.currentGroup + 1) * viewPage);
  };

  useEffect(() => {
    if (totalPage && currentPage > totalPage) {
      setPageGroup((prev) => ({
        ...prev,
        currentGroup: prev.lastGroup,
        pages: getPages(prev.lastGroup, totalPage, viewPage),
      }));
    }
    setPageGroup({
      currentGroup: Math.floor(currentPage / viewPage),
      lastGroup: Math.ceil(totalPage / viewPage) - 1,
      pages: getPages(Math.floor(currentPage / viewPage), totalPage, viewPage),
    });
  }, [totalPage, viewPage, currentPage]);

  return (
    <HStack>
      <Button
        onClick={toFirstPageGroup}
        isDisabled={pageGroup.currentGroup === 0}
        _disabled={{ cursor: "not-allowed", opacity: 0.3 }}
        variant="outline"
        rounded="none"
        size={{ base: "xs", sm: "sm", lg: "md" }}
      >
        <Icon as={BsChevronDoubleLeft} boxSize="0.875rem" />
      </Button>
      <Button
        onClick={toPrevPageGroup}
        isDisabled={pageGroup.currentGroup === 0}
        _disabled={{ cursor: "not-allowed", opacity: 0.3 }}
        variant="outline"
        rounded="none"
        size={{ base: "xs", sm: "sm", lg: "md" }}
      >
        <Icon as={BsChevronLeft} boxSize="0.875rem" />
      </Button>
      {pageGroup.pages.map((page) => (
        <Button
          key={page}
          onClick={() => {
            onChangePage(page);
          }}
          variant={page === currentPage ? "primary" : "outline"}
          rounded="none"
          fontSize={{ base: "0.5rem", lg: "0.875rem" }}
          size={{ base: "xs", sm: "sm", lg: "md" }}
        >
          {page + 1}
        </Button>
      ))}
      <Button
        onClick={toNextPageGroup}
        isDisabled={pageGroup.currentGroup === pageGroup.lastGroup}
        _disabled={{ cursor: "not-allowed", opacity: 0.3 }}
        variant="outline"
        rounded="none"
        size={{ base: "xs", sm: "sm", lg: "md" }}
      >
        <Icon as={BsChevronRight} boxSize="0.875rem" />
      </Button>
      <Button
        onClick={toLastPageGroup}
        isDisabled={pageGroup.currentGroup === pageGroup.lastGroup}
        _disabled={{ cursor: "not-allowed", opacity: 0.3 }}
        variant="outline"
        rounded="none"
        size={{ base: "xs", sm: "sm", lg: "md" }}
      >
        <Icon as={BsChevronDoubleRight} boxSize="0.875rem" />
      </Button>
    </HStack>
  );
};
