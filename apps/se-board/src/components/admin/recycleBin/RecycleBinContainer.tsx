import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { AccountPanel } from "./AccountPanel";
import { CommentPanel } from "./CommentPanel";
import { PostPanel } from "./PostPanel";

export const RecycleBinContainer = () => {
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
          <Tab onClick={() => {}}>회원</Tab>
          <Tab onClick={() => {}}>게시글</Tab>
          <Tab onClick={() => {}}>댓글</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" h="2px" bg="blue.5" borderRadius="2px" />
        <TabPanels>
          <TabPanel>
            <AccountPanel />
          </TabPanel>
          <TabPanel>
            <PostPanel />
          </TabPanel>
          <TabPanel>
            <CommentPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
