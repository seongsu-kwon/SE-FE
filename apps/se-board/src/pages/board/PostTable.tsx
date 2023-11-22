import { Flex } from "@chakra-ui/react";
import { PostListItem } from "@types";

import { Pagination, PostTable as Table } from "@/components";
import { usePostSearchParams } from "@/hooks/usePostSearchParams";

export const PostTable = ({
  data,
  totalItems = 0,
  perPage,
  page,
}: {
  data?: PostListItem[];
  totalItems?: number;
  perPage: number;
  page?: number;
}) => {
  const { setPageSearchParam } = usePostSearchParams();
  const onChange = (page: number) => {
    setPageSearchParam(page);
    window.scrollTo(0, 0);
  };

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
