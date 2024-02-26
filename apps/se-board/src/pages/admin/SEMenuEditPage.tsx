import {
  Box,
  Button,
  HStack,
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
import {
  allMenuListState,
  boardMenuListState,
  newSEMenuState,
} from "@/store/menu";
import { getAllMenuList, getBoardMenuList } from "@/utils/menuUtils";

export const SEMenuEditPage = () => {
  const { data } = useGetMenuList();

  const [menuList, setMenuList] = useState<MenuInfomation[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<
    MenuInfomation | undefined
  >();

  const [newSEMenu, setNewSEMenu] = useRecoilState(newSEMenuState);
  const setBoardMenuList = useSetRecoilState(boardMenuListState);
  const setAllMenuList = useSetRecoilState(allMenuListState);

  useEffect(() => {
    if (!data) return;

    const allMenuList = getAllMenuList(data);
    setMenuList(allMenuList);
    setAllMenuList(data);
    setSelectedMenu(
      allMenuList.length > 0
        ? newSEMenu !== ""
          ? allMenuList.filter((v) => v.name === newSEMenu)[0]
          : allMenuList[0]
        : undefined
    );
    setBoardMenuList(getBoardMenuList(allMenuList));
  }, [data, newSEMenu]);

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
      <HStack spacing="1rem">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<BsChevronDown />}
            fontSize="lg"
            bg="white"
            border="1px solid"
            borderColor="gray.4"
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
          </MenuList>
        </Menu>
        <Button
          leftIcon={<BsPlusCircle />}
          variant="primary-outline"
          bgColor={"white"}
          onClick={() => onSelectMenu(undefined)}
        >
          메뉴 추가
        </Button>
      </HStack>
      {selectedMenu !== undefined ? (
        <MenuEdit menuInfo={selectedMenu} />
      ) : (
        <AddMenu />
      )}
    </Box>
  );
};
