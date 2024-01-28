import { Box, Button, Flex } from "@chakra-ui/react";
import { FetchAdminPostListParams } from "@types";
import { useEffect, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

import { Pagination } from "@/components";
import { PageHeaderTitle } from "@/components/admin";
import { useAdminPostSearchParams } from "@/hooks";
import {
  useAdminFetchPostList,
  useAdminTrashPost,
} from "@/react-query/hooks/admin/useAdminPostQuery";

import { AdminPostFilter } from "./AdminPostFilter";
import { AdminPostTable } from "./PostTable";

export default () => {
  const [selectedPostIds, setSelectedPostIds] = useState<number[]>([]);
  const [params, setParams] = useState<FetchAdminPostListParams>({
    page: 0,
    perPage: 10,
    exposeOption: undefined,
    isReported: undefined,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useAdminFetchPostList(params);

  const { setPageSearchParam } = useAdminPostSearchParams();

  const { mutate: trahsPostList, isLoading } = useAdminTrashPost();

  const onChangePage = (page: number) => {
    setPageSearchParam(page);
    window.scrollTo(0, 0);
  };

  const onDeleteButtonClick = () => {
    trahsPostList(selectedPostIds);
    setSelectedPostIds([]);
  };

  useEffect(() => {
    const page = searchParams.get("page");
    const perPage = searchParams.get("perPage");
    const exposeOption = searchParams.get("expose");
    const isReported = searchParams.get("reported");

    setParams({
      page: page ? parseInt(page) : 0,
      perPage: perPage ? parseInt(perPage) : params.perPage,
      exposeOption: exposeOption ? exposeOption : undefined,
      isReported: isReported ? true : undefined,
    });
  }, [searchParams]);

  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="게시글 관리" />
      <Box
        w="full"
        my="20px"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
        bgColor="white"
        overflowX="hidden"
      >
        <AdminPostFilter />
        <AdminPostTable
          posts={data?.content}
          setSelectedPostIds={setSelectedPostIds}
        />
        <Flex mt="0.5rem" justify="end">
          <Button
            leftIcon={<BsTrash3 />}
            variant="danger"
            isDisabled={selectedPostIds.length === 0}
            onClick={onDeleteButtonClick}
            isLoading={isLoading}
            loadingText="삭제 중"
          >
            삭제
          </Button>
        </Flex>
        <Flex justify="center">
          <Pagination
            totalPage={data?.totalPages ?? 0}
            currentPage={data?.pageable.pageNumber ?? 0}
            onChangePage={onChangePage}
          />
        </Flex>
      </Box>
    </Box>
  );
};
