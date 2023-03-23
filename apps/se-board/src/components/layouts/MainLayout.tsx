import { Hide, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { DesktopHeaderNavigation, HeaderNavigation } from "@/components";

export const MainLayout = () => {
  return (
    <>
      <Show above="md">
        <DesktopHeaderNavigation />
      </Show>
      <Hide above="md">
        <HeaderNavigation />
      </Hide>
      <Outlet />
    </>
  );
};
