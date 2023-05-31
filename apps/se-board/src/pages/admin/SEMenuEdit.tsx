import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Menus } from "@types";
import { useEffect, useState } from "react";
import { BsChevronDown, BsPlusCircle } from "react-icons/bs";

import { PageHeaderTitle } from "@/components/admin";
import { MenuSetting } from "@/components/admin/menuSettings";
import { useFetchMenuList } from "@/react-query/hooks/useMenu";

// const data = [
//   {
//     menuId: 1,
//     name: "공지",
//     urlId: "notice",
//     type: "BOARD",
//     subMenu: [
//       {
//         menuId: 2,
//         name: "일반",
//         urlId: "djggjgjjd",
//         type: "CATEGORY",
//         subMenu: [],
//       },
//       {
//         menuId: 3,
//         name: "학사",
//         urlId: "bjfjffdgd",
//         type: "CATEGORY",
//         subMenu: [],
//       },
//     ],
//   },
//   {
//     menuId: 4,
//     name: "채용",
//     externalUrl: "www.kumoh.ac.kr",
//     type: "EXTERNAL",
//     subMenu: [],
//   },
//   {
//     menuId: 5,
//     name: "프로젝트실 예약",
//     type: "MENU",
//     subMenu: [
//       {
//         menuId: 6,
//         name: "프로젝트실 예약 공지",
//         urlId: "booking-notice",
//         type: "BOARD",
//         subMenu: [
//           {
//             menuId: 7,
//             name: "일반",
//             urlId: "djggjgjjd",
//             type: "CATEGORY",
//             subMenu: [],
//           },
//         ],
//       },
//       {
//         menuId: 8,
//         name: "프로젝실 바로가기",
//         externalUrl: "www.kiosek.kr",
//         type: "EXTERNAL",
//         subMenu: [],
//       },
//     ],
//   },
// ];

interface MenuInfo {
  menuId: number;
  menuType: string;
}

interface SubMenu {
  menuId: number;
  name: string;
  urlId?: string;
  externalUrl?: string;
  type: string;
  subMenu: SubMenu[];
}

export const SEMenuEdit = () => {
  const { data } = useFetchMenuList();

  const [menuList, setMenuList] = useState<Menus>([]);
  const [menuInfo, setMenuInfo] = useState<MenuInfo>({
    menuId: -1,
    menuType: "",
  });
  const [subMenu, setSubMenu] = useState<SubMenu[]>([]);

  useEffect(() => {
    if (!data) return;

    setMenuList(data.data);

    setMenuInfo({ menuId: data.data[0].menuId, menuType: data.data[0].type });
  }, [data]);

  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="SE 메뉴 관리" />
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<BsChevronDown />}
          bg="white"
          _hover={{ bg: "gray.0" }}
        >
          설정 메뉴
        </MenuButton>
        <MenuList paddingBottom="0">
          {menuList.map((menu) => (
            <MenuItem
              id={menu.menuId + menu.type}
              key={menu.menuId}
              _hover={{ bg: "gray.1" }}
              onClick={() =>
                menu.type !== "MENU"
                  ? setMenuInfo({
                      menuId: menu.menuId,
                      menuType: menu.type,
                    })
                  : (setMenuInfo({
                      menuId: menu.menuId,
                      menuType: menu.type,
                    }),
                    setSubMenu(menu.subMenu))
              }
            >
              {menu.name}
            </MenuItem>
          ))}
          <MenuItem
            id="add-menu"
            borderTop="1px solid"
            borderColor="gray.3"
            bgColor="white"
            _hover={{ bg: "gray.1" }}
            onClick={() => setMenuInfo({ menuId: -1, menuType: "ADD" })}
          >
            <Icon as={BsPlusCircle} mr="4px" />
            메뉴 추가
          </MenuItem>
        </MenuList>
      </Menu>
      <MenuSetting
        menuId={menuInfo.menuId}
        menuType={menuInfo.menuType}
        subMenu={subMenu}
      />
    </Box>
  );
};
