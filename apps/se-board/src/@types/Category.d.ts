declare module "@types" {
  interface Category {
    menuId: number;
    name: string;
    urlId: string;
    externalUrl: string;
    type: string;
    subMenu: Category[];
  }

  interface SubMenus {
    menuId: number;
    name: string;
    urlId: string;
    subMenus: CategoryInfomation[];
  }

  interface CategoryInfomation {
    name: string;
    menuId: number;
    urlId: string;
    writeRole: string[];
    manageRole: string[];
  }
}
