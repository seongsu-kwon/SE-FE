import { Box, Flex } from "@chakra-ui/react";

import { _axios, getJWTHeader } from "@/api/axiosInstance";
import { PageHeaderTitle } from "@/components/admin";

export const PostManagePage = () => {
  _axios({
    url: "admin/posts",
    headers: getJWTHeader(),
  });
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="게시글 관리" />
      <Flex></Flex>
    </Box>
  );
};
