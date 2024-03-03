import { Box } from "@chakra-ui/react";

import { PageHeaderTitle } from "@/components/admin";
// import { LoginPolicy } from "@/components/admin/login";
import { SignUpPolicy } from "@/components/admin/signUp/Index";

export const MemberPolicy = () => {
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="회원 정책" />
      <SignUpPolicy />
      {/* <LoginPolicy /> */}
    </Box>
  );
};
