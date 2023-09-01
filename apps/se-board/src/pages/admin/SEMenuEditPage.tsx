import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MenuInfomation } from "@types";
import { useEffect, useState } from "react";
import { BsChevronDown, BsPlusCircle } from "react-icons/bs";
import { useSetRecoilState } from "recoil";

import { PageHeaderTitle } from "@/components/admin";
import { AddMenu, MenuEdit } from "@/components/admin/menuSettings";
import { useGetMenuList } from "@/react-query/hooks/useMenu";
import { boardMenuListState } from "@/store/menu";
import { getBoardMenuList } from "@/utils/menuUtils";

export const SEMenuEditPage = () => {
  const { data, refetch } = useGetMenuList();

  const [menuList, setMenuList] = useState<MenuInfomation[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<
    MenuInfomation | undefined
  >();

  const setBoardMenuList = useSetRecoilState(boardMenuListState);

  useEffect(() => {
    if (!data) return;

    setMenuList(data.menus);
    setSelectedMenu(data.menus[0]);
    setBoardMenuList(getBoardMenuList(data.menus));
  }, [data]);

  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="SE 메뉴 관리" />
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<BsChevronDown />}
          fontSize="lg"
          bg="white"
          _hover={{ bg: "gray.3" }}
        >
          {selectedMenu?.name || "메뉴 목록"}
        </MenuButton>
        <MenuList paddingBottom="0" shadow="2xl">
          {menuList.map((menu) => (
            <MenuItem
              id={menu.menuId + menu.type}
              key={menu.menuId}
              _hover={{ bg: "gray.1" }}
              onClick={() => setSelectedMenu(menu)}
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
            onClick={() =>
              setSelectedMenu({
                menuId: -1,
                name: "메뉴 추가",
                urlId: "",
                externalUrl: "",
                type: "ADD",
                subMenu: [],
              })
            }
          >
            <Icon as={BsPlusCircle} mr="4px" />
            메뉴 추가
          </MenuItem>
        </MenuList>
      </Menu>
      {selectedMenu?.type !== "ADD" ? (
        <MenuEdit menuInfo={selectedMenu} />
      ) : (
        <AddMenu />
      )}
    </Box>
  );
};
