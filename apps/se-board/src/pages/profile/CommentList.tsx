import { Divider, Flex } from "@chakra-ui/react";
import { CommentListItemDTO } from "@types";
import { Fragment } from "react";

import { Pagination } from "@/components";
import { useMyCommentSearchParams } from "@/hooks";

import { CommentListItem } from "./CommentListItem";

export const CommentList = ({
  data,
  totalItems = 0,
  perPage = 25,
  page,
}: {
  data?: CommentListItemDTO[];
  totalItems?: number;
  perPage?: number;
  page?: number;
}) => {
  const { setPageSearchParam } = useMyCommentSearchParams();
  const onChange = (page: number) => {
    setPageSearchParam(page);
    window.scrollTo(0, 0);
  };
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
          currentPage={page || 0}
          totalPage={Math.ceil(totalItems / perPage) || 1}
          onChangePage={onChange}
          viewPage={5}
        />
      </Flex>
    </Flex>
  );
};
