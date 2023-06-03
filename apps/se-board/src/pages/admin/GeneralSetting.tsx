import { Box } from "@chakra-ui/react";

import { PageHeaderTitle } from "@/components/admin";
import { AdminIPManage } from "@/components/admin/general/AdminIPManage";
import { SpamManage } from "@/components/admin/general/SpamManage";

export const GeneralSetting = () => {
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="일반" />
      <AdminIPManage />
      <SpamManage />
    </Box>
  );
};
