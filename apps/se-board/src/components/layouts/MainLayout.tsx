import { Hide, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { DesktopHeaderNavigation, HeaderNavigation } from "@/components";

export const MainLayout = () => {
  return (
    <>
      <Show above="lg">
        <DesktopHeaderNavigation />
      </Show>
      <Hide above="lg">
        <HeaderNavigation />
      </Hide>
      <Outlet />
    </>
  );
};
