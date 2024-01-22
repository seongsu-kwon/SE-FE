import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { AllComments } from "@types";
import { useEffect, useState } from "react";

import { Pagination } from "@/components/Pagination";
import { useCommentSearchParams } from "@/hooks/useCommentSearchParams";
import { useGetAdminCommmentQuery } from "@/react-query/hooks";

import { SearchForm } from "../SearchForm";
import { AllCommentTable } from "./AllCommentTable";

const SearchOptions = [
  { value: "ALL", label: "전체" },
  { value: "CONTENT", label: "내용" },
  { value: "AUTHOR", label: "작성자" },
];

export const CommentContainer = () => {
  const [comments, setComments] = useState<AllComments>();
  const {
    page,
    searchOption,
    query,
    isReadOnlyAuthor,
    isReported,
    setPageSearchParam,
    setSearchOptionAndQuery,
    setClassific,
  } = useCommentSearchParams();

  const { data, refetch } = useGetAdminCommmentQuery(
    isReadOnlyAuthor,
    isReported,
    page,
    25,
    searchOption,
    query
  );

  useEffect(() => {
    if (!data) return;

    setComments(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page, searchOption, query, isReadOnlyAuthor, isReported]);

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
      overflowX="auto"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        py="0.25rem"
        borderTop="1px solid"
        borderColor="gray.3"
      >
        <HStack flexWrap="wrap">
          <Button
            variant="ghost"
            color={
              isReadOnlyAuthor === null && isReported === null ? "primary" : ""
            }
            onClick={() => setClassific(undefined, undefined)}
          >
            전체
          </Button>
          <Button
            variant="ghost"
            color={
              isReadOnlyAuthor === false && isReported === null ? "primary" : ""
            }
            onClick={() => setClassific(false, undefined)}
          >
            공개
          </Button>
          <Button
            variant="ghost"
            color={
              isReadOnlyAuthor === true && isReported === null ? "primary" : ""
            }
            onClick={() => setClassific(true, undefined)}
          >
            비밀
          </Button>
          <Button
            variant="ghost"
            color={isReadOnlyAuthor === null && isReported ? "primary" : ""}
            onClick={() => setClassific(undefined, true)}
          >
            신고
          </Button>
        </HStack>
        <SearchForm
          searchOption={searchOption}
          query={query}
          setSearchOptionAndQuery={setSearchOptionAndQuery}
          searchOptions={SearchOptions}
        />
      </Flex>
      <AllCommentTable
        commentList={comments?.content || []}
        refetch={refetch}
      />
      <Flex alignItems="center" justifyContent="center" mt="0.5rem">
        <Pagination
          currentPage={comments?.pageable.pageNumber || 0}
          totalPage={comments?.totalPages || 1}
          onChangePage={(page: number) => {
            setPageSearchParam(page);
            window.scrollTo(0, 0);
          }}
        />
      </Flex>
    </Box>
  );
};
