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
import { BsChevronDown } from "react-icons/bs";

export const MenuAdd = () => {
  return (
    <Box my="1rem">
      <Heading fontSize="lg">그룹 메뉴 추가</Heading>
      <Flex alignItems="center" my="1rem">
        <Text fontSize="lg" mr="0.5rem">
          메뉴
        </Text>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            메뉴 선택
          </MenuButton>
          <MenuList>
            <MenuOptionGroup type="checkbox">
              <MenuItemOption value="notice">공지사항</MenuItemOption>
              <MenuItemOption value="free">자유게시판</MenuItemOption>
              <MenuItemOption value="job">취업게시판</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
