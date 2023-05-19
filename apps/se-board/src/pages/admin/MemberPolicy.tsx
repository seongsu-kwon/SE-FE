import { Box } from "@chakra-ui/react";

import { PageHeaderTitle, SignUpPolicy } from "@/components/admin";

export const MemberPolicy = () => {
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="회원 정책" />
      <SignUpPolicy />
    </Box>
  );
};
