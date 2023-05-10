import { Divider, Flex } from "@chakra-ui/react";
import { PostListItem as PostListItemType } from "@types";
import { Fragment } from "react";

import { Pagination, PostListItem } from "@/components";
import { usePagination } from "@/hooks";

export const PostList = ({
  data,
  totalItems = 0,
  perPage = 25,
  onChange,
  page,
}: {
  data?: PostListItemType[];
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
      {data?.map((notice) => (
        <Fragment key={notice.postId}>
          <PostListItem {...notice} />
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
