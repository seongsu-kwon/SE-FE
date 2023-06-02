declare module "@types" {
  type Menu = MenuMenu & BoardMenu & ExternalMenu & CategoryMenu;
  type MenuType = "MENU" | "BOARD" | "EXTERNAL" | "CATEGORY";

  interface MenuMenu {
    menuId: number;
    type: MenuType;
    name: string;
    subMenu: Menu[];
  }

  interface BoardMenu {
    menuId: number;
    type: Pick<MenuType, "BOARD">;
    name: string;
    urlId: string;
    subMenu: Menu[];
  }

  interface ExternalMenu {
    menuId: number;
    type: Pick<MenuType, "EXTERNAL">;
    name: string;
    externalUrl: string;
    subMenu: [];
  }

  interface CategoryMenu {
    menuId: number;
    type: Pick<MenuType, "CATEGORY">;
    name: string;
    urlId: string;
    subMenu: [];
  }

  interface MenuInfomation {
    menuId: number;
    name: string;
    urlId: string;
    externalUrl: string;
    type: MenuType | "ADD" | "NULL";
    subMenu: MenuInfomation[];
  }

  interface MenuList {
    menus: MenuInfomation[];
  }
}
