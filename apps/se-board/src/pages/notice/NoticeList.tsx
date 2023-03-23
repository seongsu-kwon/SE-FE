import { Divider, Flex } from "@chakra-ui/react";

import { PostListItem } from "@/components";

import { MOCK_NOTICE_LIST } from "./mockData";

export const NoticeList = () => {
  return (
    <Flex direction="column">
      {MOCK_NOTICE_LIST.map((notice) => (
        <>
          <PostListItem key={notice.postId} {...notice} />
          <Divider />
        </>
      ))}
    </Flex>
  );
};
