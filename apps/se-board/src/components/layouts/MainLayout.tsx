import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { DesktopHeaderNavigation } from "@/components";
import { menuListState } from "@/store/menu";
import { mobileHeaderState } from "@/store/mobileHeaderState";

export const MainLayout = () => {
  const MenuList = useRecoilValue(menuListState);
  const mobileOpen = useRecoilValue(mobileHeaderState);

  return (
    <>
      <Box display={{ base: mobileOpen ? "block" : "none", md: "block" }}>
        <DesktopHeaderNavigation menuList={MenuList} />
      </Box>
      <Flex justifyContent="center">
        <Outlet />
      </Flex>
    </>
  );
};
