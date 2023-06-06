import { Box } from "@chakra-ui/react";

import { PageHeaderTitle } from "@/components/admin";
import { BannerManage, MenuItemManage } from "@/components/admin/mainPage";

export const MainPageSetting = () => {
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="메인 페이지 설정" />
      <BannerManage />
      <MenuItemManage />
    </Box>
  );
};
