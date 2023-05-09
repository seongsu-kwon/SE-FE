import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { DesktopHeaderNavigation } from "@/components";
import { menuListState } from "@/store/menu";

export const MainLayout = () => {
  const MenuList = useRecoilValue(menuListState);

  return (
    <>
      <DesktopHeaderNavigation menuList={MenuList} />

      <Flex justifyContent="center">
        <Outlet />
      </Flex>
    </>
  );
};
