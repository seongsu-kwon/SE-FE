import { Box } from "@chakra-ui/react";

import { PageHeaderTitle } from "@/components/admin";
import { AdminIPManage } from "@/components/admin/general/AdminIPManage";
import { FileManage } from "@/components/admin/general/FileManage";
// import { ReportManage } from "@/components/admin/general/ReportManage";
import { SpamManage } from "@/components/admin/general/SpamManage";

export const GeneralSetting = () => {
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="일반" />
      <AdminIPManage />
      <SpamManage />
      <FileManage />
      {/* <ReportManage /> */}
    </Box>
  );
};
