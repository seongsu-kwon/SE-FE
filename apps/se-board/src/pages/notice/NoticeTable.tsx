import { Flex } from "@chakra-ui/react";

import { Pagination, PostTable } from "@/components";
import { usePagination } from "@/hooks";

import { MOCK_NOTICE_LIST } from "./mockData";

export const NoticeTable = () => {
  const { currentPage, totalPages, onChangePage } = usePagination(1001, 20);
  return (
    <Flex direction="column" alignItems="center" gap="2rem" w="full">
      <PostTable data={MOCK_NOTICE_LIST} />
      <Pagination
        currentPage={currentPage}
        totalPage={totalPages}
        onChangePage={onChangePage}
      />
    </Flex>
  );
};
