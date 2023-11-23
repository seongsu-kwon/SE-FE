import {
  Box,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { AllComments } from "@types";
import { useEffect, useState } from "react";

import { Pagination } from "@/components/Pagination";
import { useCommentSearchParams } from "@/hooks/useCommentSearchParams";
import { useGetAdminCommmentQuery } from "@/react-query/hooks";

import { AllCommentTable } from "./AllCommentTable";

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
    25
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
      <Tabs variant="unstyled">
        <TabList>
          <Tab onClick={() => setClassific(undefined, undefined)}>전체</Tab>
          <Tab onClick={() => setClassific(false, undefined)}>공개</Tab>
          <Tab onClick={() => setClassific(true, undefined)}>비밀</Tab>
          <Tab onClick={() => setClassific(undefined, true)}>신고</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" h="2px" bg="blue.5" borderRadius="2px" />
        <TabPanels>
          <TabPanel>
            <AllCommentTable
              commentList={comments?.content || []}
              refetch={refetch}
            />
          </TabPanel>
          <TabPanel>
            <AllCommentTable
              commentList={comments?.content || []}
              refetch={refetch}
            />
          </TabPanel>
          <TabPanel>
            <AllCommentTable
              commentList={comments?.content || []}
              refetch={refetch}
            />
          </TabPanel>
          <TabPanel>
            <AllCommentTable
              commentList={comments?.content || []}
              refetch={refetch}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
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
