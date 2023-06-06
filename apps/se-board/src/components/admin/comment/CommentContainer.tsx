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
import { useGetAdminCommmentQuery } from "@/react-query/hooks";

import { AllCommentTable } from "./AllCommentTable";

export const CommentContainer = () => {
  const [comments, setComments] = useState<AllComments>();
  const [selectedTab, setSelectedTab] = useState<{
    isReadOnlyAuthor?: boolean;
    isReported?: boolean;
  }>({
    isReadOnlyAuthor: undefined,
    isReported: undefined,
  });
  const [page, setPage] = useState<number>(0);

  const { data, refetch } = useGetAdminCommmentQuery(
    page,
    25,
    selectedTab.isReadOnlyAuthor,
    selectedTab.isReported
  );

  useEffect(() => {
    if (!data) return;

    setComments(data);
  }, [data]);

  useEffect(() => {
    console.log(selectedTab);
    refetch();
  }, [selectedTab, page]);

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
          <Tab
            onClick={() =>
              setSelectedTab({
                isReadOnlyAuthor: undefined,
                isReported: undefined,
              })
            }
          >
            전체
          </Tab>
          <Tab
            onClick={() =>
              setSelectedTab({
                isReadOnlyAuthor: false,
                isReported: undefined,
              })
            }
          >
            공개
          </Tab>
          <Tab
            onClick={() =>
              setSelectedTab({ isReadOnlyAuthor: true, isReported: undefined })
            }
          >
            비밀
          </Tab>
          <Tab
            onClick={() =>
              setSelectedTab({ isReadOnlyAuthor: undefined, isReported: true })
            }
          >
            신고
          </Tab>
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
            setPage(page);
            window.scrollTo(0, 0);
          }}
        />
      </Flex>
    </Box>
  );
};
