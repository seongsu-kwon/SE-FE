import { Divider, Flex } from "@chakra-ui/react";
import { PostListItem as PostListItemType } from "@types";
import { Fragment } from "react";

import { PostListItem } from "@/components";

export const PostList = ({ data }: { data?: PostListItemType[] }) => {
  return (
    <Flex direction="column" pb="54px">
      {data?.map((notice) => (
        <Fragment key={notice.postId}>
          <PostListItem {...notice} />
          <Divider />
        </Fragment>
      ))}
    </Flex>
  );
};
