import { Box } from "@chakra-ui/react";

import { PageHeaderTitle } from "@/components/admin";
import { CommentContainer } from "@/components/admin/comment";

export const CommentManage = () => {
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="댓글 관리" />
      <CommentContainer />
    </Box>
  );
};
