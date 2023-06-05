import { Box } from "@chakra-ui/react";

import { PageHeaderTitle } from "@/components/admin";
import { MemberGroupContainer } from "@/components/admin/memberGroup";

export const MemberGroupManage = () => {
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="회원 그룹" />
      <MemberGroupContainer />
    </Box>
  );
};
