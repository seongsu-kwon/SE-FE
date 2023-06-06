import { Divider, Flex } from "@chakra-ui/react";
import { CommentListItemDTO } from "@types";
import { Fragment } from "react";

import { Pagination } from "@/components";
import { usePagination } from "@/hooks";

import { CommentListItem } from "./CommentListItem";

export const CommentList = ({
  data,
  totalItems = 0,
  perPage = 25,
  onChange,
  page,
}: {
  data?: CommentListItemDTO[];
  totalItems?: number;
  perPage?: number;
  page?: number;
  onChange?: (page: number) => void;
}) => {
  const { currentPage, totalPages, onChangePage } = usePagination(
    totalItems,
    perPage,
    {
      onChange,
      current: page,
    }
  );
  return (
    <Flex direction="column" pt="56px" pb="54px" w="full">
      {data?.map((item, i) => (
        <Fragment key={i}>
          <CommentListItem {...item} />
          <Divider />
        </Fragment>
      ))}
      <Flex w="full" justify="center" py="2rem">
        <Pagination
          currentPage={currentPage}
          totalPage={totalPages}
          onChangePage={onChangePage}
          viewPage={5}
        />
      </Flex>
    </Flex>
  );
};
