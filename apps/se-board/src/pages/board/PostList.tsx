import { Divider, Flex } from "@chakra-ui/react";
import { PostListItem as PostListItemType } from "@types";
import { Fragment } from "react";

import { Pagination, PostListItem } from "@/components";
import { usePostSearchParams } from "@/hooks/usePostSearchParams";

export const PostList = ({
  data,
  totalItems = 0,
  perPage = 25,
  page,
}: {
  data?: PostListItemType[];
  totalItems?: number;
  perPage?: number;
  page?: number;
}) => {
  const { setPageSearchParam } = usePostSearchParams();
  const onChange = (page: number) => {
    setPageSearchParam(page);
    window.scrollTo(0, 0);
  };

  return (
    <Flex direction="column" pt="56px" pb="54px" w="full">
      {data?.map((notice, i) => (
        <Fragment key={i}>
          <PostListItem {...notice} />
          <Divider />
        </Fragment>
      ))}
      <Flex w="full" justify="center" py="2rem">
        <Pagination
          currentPage={page || 0}
          totalPage={Math.ceil(totalItems / perPage) || 1}
          onChangePage={onChange}
          viewPage={5}
        />
      </Flex>
    </Flex>
  );
};
