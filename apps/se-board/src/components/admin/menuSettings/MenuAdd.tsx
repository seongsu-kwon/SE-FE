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
      <Text fontSize="sm" color="gray.6">
        그룹 메뉴 추가는 생성되어 있는 메뉴만 추가 가능합니다.
      </Text>
      <Flex alignItems="center" my="1rem">
        <Heading fontSize="md" mr="0.5rem">
          메뉴
        </Heading>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            메뉴 선택
          </MenuButton>
          <MenuList>
            <MenuOptionGroup defaultValue="notice" type="radio">
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
