import { Menu } from "@types";
import { useLocation, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import { menuListState } from "@/store/menu";

export const useMenu = () => {
  const [menuList, setMenuList] = useRecoilState(menuListState);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const getMenuByUrlId = (urlId: string) => {
    const flatMenuList: Menu[] = [];
    menuList.forEach((menu) => {
      if (menu.type === "BOARD") {
        flatMenuList.push(menu);
      } else if (menu.type === "MENU") {
        menu.subMenu
          .filter((subMenu) => subMenu.type === "BOARD")
          .forEach((subMenu) => flatMenuList.push(subMenu));
      }
    });
    return flatMenuList.find((menu) => menu.urlId === urlId);
  };

  const getMenuIdByUrlId = (urlId: string, superMenuUrlId: string = "") => {
    if (superMenuUrlId) {
      const flatMenuList: Menu[] = [];
      menuList.forEach((menu) => {
        if (menu.type === "BOARD") {
          flatMenuList.push(menu);
        } else if (menu.type === "MENU") {
          menu.subMenu
            .filter((subMenu) => subMenu.type === "BOARD")
            .forEach((subMenu) => flatMenuList.push(subMenu));
        }
      });

      const id = flatMenuList
        .find((menu) => menu.urlId === superMenuUrlId)
        ?.subMenu.find((subMenu) => subMenu.urlId === urlId)?.menuId;
      if (id) {
        return id;
      } else {
        return flatMenuList.find((menu) => menu.urlId === superMenuUrlId)
          ?.menuId;
      }
    } else {
      return menuList.find((menu) => menu.urlId === urlId)?.menuId;
    }
  };

  const getCurrentMenu = () => {
    return getMenuByUrlId(location.pathname.split("/")[1]);
  };

  const getCurrentMenuId = () => {
    if (searchParams.has("category")) {
      return getMenuIdByUrlId(
        searchParams.get("category")!,
        location.pathname.split("/")[1]
      );
    } else {
      return getMenuIdByUrlId(location.pathname.split("/")[1]);
    }
  };

  return {
    menuList,
    setMenuList,
    getMenuIdByUrlId,
    getMenuByUrlId,
    getCurrentMenu,
    getCurrentMenuId,
  };
};
