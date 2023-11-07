import { MenuSettingRole } from "@types";

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
    type: MenuType | "ADD" | "NULL";
    access: MenuSettingRole;
    write: MenuSettingRole;
    manage: MenuSettingRole;
    expose: MenuSettingRole;
    subMenus: MenuInfomation[];
  }

  type MenuList = MenuInfomation[];

  type MainPageMenus = MainPageMenu[];

  type SelectedMainPageMenus = {
    id: number;
    menuId: number;
    name: string;
    url: string;
    description: string;
  }[];

  interface MainPageMenu {
    categoryId: number;
    name: string;
    url: string;
  }

  interface MenuCreation {
    superCategoryId: number;
    name: string;
    urlId: string;
    externalUrl: string;
    manageOption: string[];
  }

  interface MenuInfo {
    name: string;
    description: string;
    externalUrl: string;
    urlId: string;
    access: MenuSettingRole;
    write: MenuSettingRole;
    manage: MenuSettingRole;
    menuExpose: MenuSettingRole;
  }

  interface PostMenuInfo {
    name: string;
    description: string;
    externalUrl: string;
    urlId: string;
    access: {
      option: string;
      roles: number[];
    };
    write: {
      option: string;
      roles: number[];
    };
    manage: {
      option: string;
      roles: number[];
    };
    expose: {
      option: string;
      roles: number[];
    };
  }

  interface MenuRoleInfo {
    access: {
      option: string;
      roles: number[];
    };
    write: {
      option: string;
      roles: number[];
    };
    manage: {
      option: string;
      roles: number[];
    };
    expose: {
      option: string;
      roles: number[];
    };
  }
}
