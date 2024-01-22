import {
  AdminSettingRole,
  MainPageMenu,
  MenuInfomation,
  MenuSettingRole,
} from "@types";

export const isCheckedMenuCount = (
  menuList: (MainPageMenu & { isChecked: boolean })[]
) => {
  return menuList.filter((menu) => menu.isChecked).length;
};

export function getBoardMenuList(menuList: MenuInfomation[]) {
  const boardMenuList: MenuInfomation[] = [];

  menuList.forEach((menu) => {
    if (menu.type === "BOARD") {
      boardMenuList.push(menu);
    } else if (menu.type === "CATEGORY") {
      boardMenuList.push(
        ...menu.subMenus.filter((subMenu) => subMenu.type === "BOARD")
      );
    }
  });

  return boardMenuList;
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

const adminMenuList = [
  {
    kor: "메뉴 관리",
    eng: "menuSetting",
    menus: [{ kor: "SE 메뉴 편집", eng: "menuEdit" }],
  },
  {
    kor: "회원 관리",
    eng: "accountManage",
    menus: [
      { kor: "회원 목록", eng: "accountList" },
      { kor: "회원 정책", eng: "accountPolicy" },
      { kor: "회원 그룹", eng: "roles" },
    ],
  },
  {
    kor: "컨텐츠 관리",
    eng: "contentManage",
    menus: [
      { kor: "게시글 관리", eng: "post" },
      { kor: "댓글 관리", eng: "comment" },
      { kor: "첨부파일 관리", eng: "file" },
      { kor: "휴지통", eng: "trash" },
    ],
  },
  {
    kor: "설정",
    eng: "generalSetting",
    menus: [
      { kor: "일반", eng: "general" },
      { kor: "메인 페이지 설정", eng: "mainPage" },
    ],
  },
];

export function adminMenuRoleList(
  heading: string,
  menuInfo: MenuSettingRole[]
) {
  const menu = adminMenuList.find((menu) => menu.kor === heading);

  if (menu === undefined) return;

  let adminMenuRoleInfo: { [key: string]: MenuSettingRole } = {};

  menuInfo.forEach((subMenu) => {
    const key: string =
      menu.menus.find((v) => v.kor === subMenu.name)?.eng || "";

    adminMenuRoleInfo[key] = subMenu;
  });

  const adminMenuRoleListValue = {
    [menu.eng]: adminMenuRoleInfo,
  };

  return adminMenuRoleListValue;
}

export function getAllMenuList(
  menuList: MenuInfomation[] | undefined
): MenuInfomation[] {
  if (menuList === undefined) return [];

  const allMenuList: MenuInfomation[] = [];

  menuList.forEach((menu) => {
    if (menu.type === "MENU") {
      allMenuList.push(menu);
      allMenuList.push(...menu.subMenus);
    } else {
      allMenuList.push(menu);
    }
  });

  return allMenuList;
}

export function getPossibleSubMenus(
  menuList: MenuInfomation[]
): MenuInfomation[] {
  return menuList.filter((menu) => {
    return menu.type !== "MENU";
  });
}
