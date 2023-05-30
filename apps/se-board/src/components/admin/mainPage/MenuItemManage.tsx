import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const data = {
  menu: [
    { id: "notice", name: "공지사항" },
    { id: "sch", name: "학사공지" },
    { id: "ilban", name: "일반소식" },
    { id: "ch", name: "취업정보" },
    { id: "event", name: "행사안내" },
  ],
};

export const MenuItemManage = () => {
  const [menuList, setMenuList] = useState<
    { id: string; name: string; isChecked: boolean }[]
  >([]);

  useEffect(
    () =>
      setMenuList(data.menu.map((value) => ({ ...value, isChecked: false }))),
    [data]
  );

  const onClick = (value: { id: string; name: string }) => {
    const index = menuList.findIndex((v) => v.id === value.id);
    const newMenuList = [...menuList];
    newMenuList[index].isChecked = !newMenuList[index].isChecked;
    setMenuList(newMenuList);
  };

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Text
        fontWeight="semibold"
        fontSize={{ base: "xl", md: "2xl" }}
        mb="20px"
        borderBottom="1px solid"
        borderColor="gray.5"
      >
        메인 페이지 메뉴 배치
      </Text>
      <Flex alignItems="start" mb="0.5rem">
        <Heading fontSize="lg" mr="4px">
          메뉴 선택
        </Heading>
        <Text>메인 페이지에 배치할 메뉴를 선택해 주세요.(다중 선택 가능)</Text>
      </Flex>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<BsChevronDown />}
          mr="0.25rem"
          my={{ base: "0.25rem", md: 0 }}
        >
          메뉴
        </MenuButton>
        <MenuList>
          <MenuOptionGroup type="checkbox">
            {data.menu.map((value) => (
              <MenuItemOption value={value.id} onClick={() => onClick(value)}>
                {value.name}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      {menuList.find((v) => v.isChecked === true) !== undefined && (
        <Flex alignItems="center" my="4px">
          <Text>선택된 메뉴:</Text>
          {menuList.map(
            (value) =>
              value.isChecked && (
                <Text key={value.id} mx="4px">
                  {value.name}
                </Text>
              )
          )}
        </Flex>
      )}
    </Box>
  );
};
