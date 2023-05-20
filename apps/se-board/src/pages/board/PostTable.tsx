import { Flex } from "@chakra-ui/react";
import { PostListItem } from "@types";

import { Pagination, PostTable as Table } from "@/components";

export const PostTable = ({
  data,
  totalItems = 0,
  perPage,
  onChange,
  page,
}: {
  data?: PostListItem[];
  totalItems?: number;
  perPage: number;
  page?: number;
  onChange: (page: number) => void;
}) => {
  return (
    <Flex direction="column" alignItems="center" gap="2rem" w="full">
      <Table data={data || []} />
      <Pagination
        currentPage={page || 0}
        totalPage={Math.ceil(totalItems / perPage) || 1}
        onChangePage={onChange}
      />
    </Flex>
  );
};
