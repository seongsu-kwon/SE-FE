import { Flex } from "@chakra-ui/react";
import { PostListItem } from "@types";

import { Pagination, PostTable as Table } from "@/components";
import { usePagination } from "@/hooks";

export const PostTable = ({
  data,
  totalItems = 0,
  perPage = 25,
  onChange,
  page,
}: {
  data?: PostListItem[];
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
    <Flex direction="column" alignItems="center" gap="2rem" w="full">
      <Table data={data || []} />
      <Pagination
        currentPage={currentPage}
        totalPage={totalPages}
        onChangePage={onChangePage}
      />
    </Flex>
  );
};
