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
import React from "react";
import { BsChevronDown, BsPlusCircle } from "react-icons/bs";
import { useRecoilState, useSetRecoilState } from "recoil";

import { PageHeaderTitle } from "@/components/admin";
import { AddMenu, MenuEdit } from "@/components/admin/menuSettings";
import { useGetMenuList } from "@/react-query/hooks/useMenu";
import { boardMenuListState, newSEMenuState } from "@/store/menu";
import { getBoardMenuList } from "@/utils/menuUtils";

export const SEMenuEditPage = () => {
  const { data } = useGetMenuList();

  const [menuList, setMenuList] = useState<MenuInfomation[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<
    MenuInfomation | undefined
  >();

  const [newSEMenu, setNewSEMenu] = useRecoilState(newSEMenuState);
  const setBoardMenuList = useSetRecoilState(boardMenuListState);

  useEffect(() => {
    if (!data) return;

    setMenuList(data);
    setSelectedMenu(
      data.length > 0
        ? newSEMenu !== ""
          ? data.filter((v) => v.name === newSEMenu)[0]
          : data[0]
        : undefined
    );
    setBoardMenuList(getBoardMenuList(data));
  }, [data]);

  function onSelectMenu(menu: MenuInfomation | undefined) {
    if (menu === undefined) {
      setSelectedMenu(undefined);
    } else {
      setSelectedMenu(menu);
      setNewSEMenu(menu.name);
    }
  }

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
              onClick={() => onSelectMenu(menu)}
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
            onClick={() => onSelectMenu(undefined)}
          >
            <Icon as={BsPlusCircle} mr="4px" />
            메뉴 추가
          </MenuItem>
        </MenuList>
      </Menu>
      {selectedMenu !== undefined ? (
        <MenuEdit menuInfo={selectedMenu} />
      ) : (
        <AddMenu />
      )}
    </Box>
  );
};
