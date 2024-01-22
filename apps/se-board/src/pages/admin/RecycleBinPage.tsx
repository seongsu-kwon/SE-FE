import { Box } from "@chakra-ui/react";

import { PageHeaderTitle } from "@/components/admin";
import { RecycleBinContainer } from "@/components/admin/recycleBin";

export const RecycleBinPage = () => {
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="휴지통" />
      <RecycleBinContainer />
    </Box>
  );
};
