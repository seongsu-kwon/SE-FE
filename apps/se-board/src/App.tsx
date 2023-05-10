import React, { useEffect, useState } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { MainLayout } from "@/components/layouts";

import { getStoredRefreshToken } from "./api/storage";
import {
  LoginPage,
  OAuthSignupPage,
  SignupCompletePage,
  SignupPage,
} from "./pages";
import { BoardPage } from "./pages/board/BoardPage";
import { PageNotFound } from "./pages/PageNotFound";
import { useReissueToken } from "./react-query/hooks/auth";
import { useFetchMenuList } from "./react-query/hooks/useMenu";
import { menuListState } from "./store/menu";

interface RoutesObject {
  path?: string;
  element?: React.ReactNode;
  children?: RoutesObject[];
}

const MenuRouter = () => {
  const [dynamicRoutes, setDynamicRoutes] = useState<RoutesObject[]>([]);
  const menuList = useRecoilValue(menuListState);
  const { isLoading } = useFetchMenuList();

  useEffect(() => {
    const list: RoutesObject[] = [];
    menuList.forEach((menu) => {
      if (menu.type === "BOARD") {
        list.push({
          path: menu.urlId,
          element: <BoardPage />,
        });
        list.push({
          path: `${menu.urlId}/write`,
          element: <div>게시물작성컴포넌트</div>,
        });
      } else if (menu.type === "MENU") {
        menu.subMenu
          .filter((v) => v.type === "BOARD")
          .forEach((subMenu) => {
            list.push({
              path: subMenu.urlId,
              element: <BoardPage />,
            });
            list.push({
              path: `${subMenu.urlId}/write`,
              element: <div>게시물작성컴포넌트</div>,
            });
          });
      }
    });
    setDynamicRoutes(list);
  }, [menuList]);

  return useRoutes([
    {
      path: "",
      element: <MainLayout />,
      children: [
        ...dynamicRoutes,
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
    {
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "signup",
          element: <SignupPage />,
        },
        {
          path: "signup/oauth",
          element: <OAuthSignupPage />,
        },
        {
          path: "signup/complete",
          element: <SignupCompletePage />,
        },
      ],
    },
  ]);
};

export const App = () => {
  const { mutate: reissue } = useReissueToken();

  useEffect(() => {
    if (getStoredRefreshToken()) reissue();
  }, []);

  return (
    <BrowserRouter>
      <MenuRouter />
    </BrowserRouter>
  );
};
