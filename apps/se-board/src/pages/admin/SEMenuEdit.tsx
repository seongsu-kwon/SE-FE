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

import { PageHeaderTitle } from "@/components/admin";
import { MenuSetting } from "@/components/admin/menuSettings";
import { useGetMenuList } from "@/react-query/hooks/useMenu";

const AddMenu: MenuInfomation = {
  menuId: -1,
  name: "메뉴 추가",
  urlId: "",
  externalUrl: "",
  type: "ADD",
  subMenu: [],
};

export const SEMenuEdit = () => {
  const { data } = useGetMenuList();

  const [menuList, setMenuList] = useState<MenuInfomation[]>([]);
  const [menuInfo, setMenuInfo] = useState<MenuInfomation>({
    menuId: -1,
    name: "",
    urlId: "",
    externalUrl: "",
    type: "NULL",
    subMenu: [],
  });

  useEffect(() => {
    if (!data) return;

    setMenuList(data.menus);
    setMenuInfo(data.menus[0]);
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
          {menuInfo.name === "" ? "설정 메뉴" : menuInfo.name}
        </MenuButton>
        <MenuList paddingBottom="0">
          {menuList.map((menu) => (
            <MenuItem
              id={menu.menuId + menu.type}
              key={menu.menuId}
              _hover={{ bg: "gray.1" }}
              onClick={() => setMenuInfo(menu)}
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
            onClick={() => setMenuInfo(AddMenu)}
          >
            <Icon as={BsPlusCircle} mr="4px" />
            메뉴 추가
          </MenuItem>
        </MenuList>
      </Menu>

      <MenuSetting menuInfo={menuInfo} />
    </Box>
  );
};
