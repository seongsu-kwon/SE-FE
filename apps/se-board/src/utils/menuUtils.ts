import {
  AdminMenuInfo,
  AdminMenuMenuAndRole,
  AdminMenuSettingData,
  MainPageMenu,
  MenuInfomation,
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

export function getAdminMenuArray(data: AdminMenuMenuAndRole | undefined) {
  if (data === undefined) return [];

  return [
    { heading: "메뉴 관리", list: [...data.menu] },
    {
      heading: "회원 관리",
      list: [...data.person],
    },
    {
      heading: "컨텐츠 관리",
      list: [...data.content],
    },
    {
      heading: "설정",
      list: [...data.setting],
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

export function adminMenuRoleSetting(
  data: AdminMenuMenuAndRole
): AdminMenuSettingData[] {
  const menuInfo: AdminMenuInfo[] = [];

  for (const [key, value] of Object.entries(data)) {
    menuInfo.push(...value);
  }

  const adminMenuRoleSettingArr = menuInfo.map((menu) => {
    return {
      id: menu.menu.id,
      option: { option: menu.option.option, roles: [] },
    };
  });

  return adminMenuRoleSettingArr;
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
