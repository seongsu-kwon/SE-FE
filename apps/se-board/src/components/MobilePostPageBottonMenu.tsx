import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Menu as MenuType } from "@types";
import React from "react";
import { BsFunnel, BsPencil, BsSearch } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";

export const MobilePostPageBottonMenu = ({
  categoryList,
}: {
  categoryList: MenuType[];
}) => {
  const [searchPrams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      field: { value: string };
      query: { value: string };
    };
    const field = target.field.value;
    const query = target.query.value;
    if (!query) {
      searchPrams.delete(field);
      setSearchParams(searchPrams);
    } else {
      searchPrams.append(field, query);
      setSearchParams(searchPrams);
    }
  };

  return (
    <Flex
      position="fixed"
      bottom="0"
      w="full"
      bgColor="white"
      justifyContent="space-around"
      borderTop="1px"
      borderColor="gray.3"
      p="0.5rem"
    >
      <Menu autoSelect={false}>
        <MenuButton>
          <Flex direction="column" alignItems="center">
            <Icon as={BsFunnel} />
            <Text fontSize="sm">카테고리</Text>
          </Flex>
        </MenuButton>
        <MenuList w="max-content">
          <MenuItem
            onClick={() => {
              searchPrams.delete("category");
              setSearchParams(searchPrams);
            }}
            bgColor={!searchPrams.get("category") ? "gray.1" : ""}
          >
            전체
          </MenuItem>
          {categoryList.map((category) => (
            <MenuItem
              key={category.menuId}
              onClick={() => {
                searchPrams.set("category", category.urlId);
                setSearchParams(searchPrams);
              }}
              bgColor={
                searchPrams.get("category") === category.urlId ? "gray.1" : ""
              }
            >
              {category.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Flex onClick={onOpen} direction="column" alignItems="center">
        <Icon as={BsSearch} />
        <Text fontSize="sm">검색</Text>
      </Flex>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>검색</DrawerHeader>
          <DrawerBody>
            <form
              onSubmit={(e) => {
                search(e);
                onClose();
              }}
            >
              <Stack pb="6rem">
                <Select name="field">
                  <option value="all">전체</option>
                  <option value="title">제목</option>
                  <option value="author">작성자</option>
                </Select>
                <Input name="query" placeholder="검색어를 입력하세요" />
                <Button type="submit" variant="primary">
                  검색
                </Button>
              </Stack>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Link to="write">
        <Flex direction="column" alignItems="center">
          <Icon as={BsPencil} />
          <Text fontSize="sm">글쓰기</Text>
        </Flex>
      </Link>
    </Flex>
  );
};
