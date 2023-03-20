import { Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { DesktopHeaderNavigation } from "@/components/HeaderNavigation";

export const MainLayout = () => {
  return (
    <>
      <Show above="lg">
        <DesktopHeaderNavigation />
      </Show>

      <Outlet />
    </>
  );
};
