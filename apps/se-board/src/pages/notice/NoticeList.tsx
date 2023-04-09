import { Divider, Flex } from "@chakra-ui/react";
import { Fragment } from "react";

import { PostListItem } from "@/components";

import { MOCK_NOTICE_LIST } from "./mockData";

export const NoticeList = () => {
  return (
    <Flex direction="column">
      {MOCK_NOTICE_LIST.map((notice) => (
        <Fragment key={notice.postId}>
          <PostListItem {...notice} />
          <Divider />
        </Fragment>
      ))}
    </Flex>
  );
};
