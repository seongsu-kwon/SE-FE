declare module "@types" {
  interface Category {
    menuId: number;
    name: string;
    urlId: string;
    externalUrl: string;
    type: string;
    subMenu: Category[];
  }
}
