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
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Menu as MenuType } from "@types";
import React, { useEffect, useState } from "react";
import { BsFunnel, BsPencil, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

import { usePostSearchParams } from "@/hooks/usePostSearchParams";

export const MobilePostPageBottonMenu = ({
  categoryList,
}: {
  categoryList: MenuType[];
}) => {
  const [inputs, setInputs] = useState({
    searchOption: "ALL",
    query: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    searchOption,
    query,
    search,
    deleteCategory,
    changeCategory,
    category,
  } = usePostSearchParams();

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(inputs.searchOption, inputs.query);
  };

  useEffect(() => {
    setInputs({ searchOption, query });
  }, [searchOption, query]);

  const color = useColorModeValue("gray.7", "whiteAlpha.800");
  const navBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.3", "whiteAlpha.400");
  const hoverBgColor = useColorModeValue("gray.1", "whiteAlpha.100");

  return (
    <Flex
      position="fixed"
      bottom="0"
      w="full"
      justifyContent="space-around"
      borderTop="2px"
      bgColor={navBgColor}
      borderColor={borderColor}
      p="0.5rem"
    >
      <Menu autoSelect={false}>
        <MenuButton>
          <Flex direction="column" alignItems="center" color={color}>
            <Icon as={BsFunnel} />
            <Text fontSize="sm">카테고리</Text>
          </Flex>
        </MenuButton>
        <MenuList w="max-content" color={color}>
          <MenuItem
            onClick={() => {
              deleteCategory();
            }}
            bgColor={category === "" ? hoverBgColor : ""}
          >
            전체
          </MenuItem>
          {categoryList.map((v) => (
            <MenuItem
              key={v.menuId}
              onClick={() => {
                changeCategory(v.urlId);
              }}
              bgColor={category === v.urlId ? "gray.1" : ""}
            >
              {v.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Flex
        onClick={onOpen}
        direction="column"
        alignItems="center"
        color={color}
      >
        <Icon as={BsSearch} />
        <Text fontSize="sm">검색</Text>
      </Flex>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent color={color}>
          <DrawerCloseButton />
          <DrawerHeader>검색</DrawerHeader>
          <DrawerBody>
            <form
              onSubmit={(e) => {
                onSearch(e);
                onClose();
              }}
            >
              <Stack pb="6rem">
                <Select
                  value={inputs.searchOption}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      searchOption: e.target.value,
                    }))
                  }
                  name="option"
                >
                  <option value="ALL">전체</option>
                  <option value="TITLE">제목</option>
                  <option value="AUTHOR">작성자</option>
                </Select>
                <Input
                  name="query"
                  placeholder="검색어를 입력하세요"
                  value={inputs.query}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, query: e.target.value }))
                  }
                />
                <Button type="submit" variant="primary">
                  검색
                </Button>
              </Stack>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Link to="write">
        <Flex direction="column" alignItems="center" color={color}>
          <Icon as={BsPencil} />
          <Text fontSize="sm">글쓰기</Text>
        </Flex>
      </Link>
    </Flex>
  );
};
