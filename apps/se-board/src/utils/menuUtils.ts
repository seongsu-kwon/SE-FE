import { AdminSettingRole, MainPageMenu, MenuInfomation } from "@types";

export const isCheckedMenuCount = (
  menuList: (MainPageMenu & { isChecked: boolean })[]
) => {
  return menuList.filter((menu) => menu.isChecked).length;
};

export function getBoardMenuList(menuList: MenuInfomation[]) {
  return menuList.filter((menu) => {
    if (menu.type === "MENU") {
      return menu.subMenu.filter((subMenu) => {
        subMenu.type === "BOARD";
      });
    } else if (menu.type === "BOARD") {
      return menu;
    }
  });
}

export function getAdminMenuArray(data: AdminSettingRole | undefined) {
  if (data === undefined) return [];

  return [
    { heading: "메뉴 관리", list: [data.menuSetting.menuEdit] },
    {
      heading: "회원 관리",
      list: [
        data.accountManage.accountList,
        data.accountManage.accountPolicy,
        data.accountManage.roles,
      ],
    },
    {
      heading: "컨텐츠 관리",
      list: [
        data.contentManage.post,
        data.contentManage.comment,
        data.contentManage.file,
        data.contentManage.trash,
      ],
    },
    {
      heading: "설정",
      list: [data.generalSetting.general, data.generalSetting.mainPage],
    },
  ];
}

const menuList = [
  { kor: "메뉴 관리", eng: "menuSetting" },
  { kor: "회원 관리", eng: "accountManage" },
  { kor: "컨텐츠 관리", eng: "contentManage" },
  { kor: "설정", eng: "generalSetting" },
];

export function adminMenuRoleList(heading: string) {}
