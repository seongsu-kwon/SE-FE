import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { CategoryInfomation } from "@types";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useGetCategory } from "@/react-query/hooks/useMenu";

import { AuthorityMenu } from "./AuthoritySetting";

interface CategoryItemProps {
  name: string;
  menuId: number;
  urlId: string;
  manageRole: string[];
  writeRole: string[];
}

const CategoryItem = ({
  name,
  menuId,
  urlId,
  manageRole,
  writeRole,
}: CategoryItemProps) => {
  const [isModify, setIsModify] = useState(false);
  const [modifyName, setModifyName] = useState(name);
  const [modifyId, setModifyId] = useState(urlId);

  useEffect(() => {
    setModifyName(name);
    setModifyId(urlId);
  });

  return !isModify ? (
    <>
      <Box fontSize={{ base: "14px", md: "16px" }}>{name}</Box>
      <Box fontSize={{ base: "14px", md: "16px" }}>{urlId}</Box>
      <Box maxH="2.5rem" overflow="auto" wordBreak="keep-all">
        {manageRole.length === 0 ? (
          <Flex w="full" h="full" justifyContent="center" alignItems="center">
            <Text color="gray.5" fontSize="xs">
              설정된 권한이 없습니다.
            </Text>
          </Flex>
        ) : (
          manageRole.map((value) => <Box>{value}</Box>)
        )}
      </Box>
      <Box maxH="2.5rem" overflow="auto">
        {writeRole.length === 0 ? (
          <Flex w="full" h="full" justifyContent="center" alignItems="center">
            <Text color="gray.5" fontSize="xs">
              설정된 권한이 없습니다.
            </Text>
          </Flex>
        ) : (
          writeRole.map((value) => <Box>{value}</Box>)
        )}
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="update&delete"
          icon={<BsThreeDotsVertical />}
          variant="ghost"
        />
        <MenuList maxW="0.5rem">
          <MenuItem
            onClick={() => {
              setIsModify(true);
            }}
          >
            수정
          </MenuItem>
          <MenuItem>삭제</MenuItem>
        </MenuList>
      </Menu>
    </>
  ) : (
    <>
      <Input
        placeholder="카테고리 이름"
        value={modifyName}
        onChange={(e) => setModifyName(e.target.value)}
      />
      <Input
        placeholder="카테고리 ID"
        value={modifyId}
        onChange={(e) => setModifyId(e.target.value)}
      />
      <AuthorityMenu />
      <AuthorityMenu />
      <Button variant="primary" onClick={() => setIsModify(false)}>
        등록
      </Button>
    </>
  );
};

export const CategorySetting = ({ menuId }: { menuId: number }) => {
  const { data } = useGetCategory(menuId);

  const [categoryList, setCategoryList] = useState<CategoryInfomation[]>([
    {
      name: "일반",
      menuId: -1,
      urlId: "",
      manageRole: [],
      writeRole: [],
    },
  ]);

  useEffect(() => {
    if (!data) return;

    setCategoryList(data.subMenus);
  }, [data]);

  return (
    <SimpleGrid
      columns={5}
      spacingX={{ base: 0, md: "1rem" }}
      spacingY={{ md: "0.5rem" }}
      textAlign="center"
    >
      <Box borderBottom="1px solid" borderColor="gray.5">
        카테고리 이름
      </Box>
      <Box borderBottom="1px solid" borderColor="gray.5">
        카테고리 ID
      </Box>
      <Box borderBottom="1px solid" borderColor="gray.5">
        관리 권한
      </Box>
      <Box borderBottom="1px solid" borderColor="gray.5">
        작성 권한
      </Box>
      <Box borderBottom="1px solid" borderColor="gray.5">
        수정 / 삭제
      </Box>
      {categoryList.map((category) => (
        <CategoryItem
          name={category.name}
          menuId={category.menuId}
          urlId={category.urlId}
          manageRole={category.manageRole}
          writeRole={category.writeRole}
        />
      ))}
    </SimpleGrid>
  );
};

interface CategoryInputProps {
  newCategory: string;
  onNewCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newCategoryId: string;
  onNewCategoryIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CategoryInput = ({
  newCategory,
  onNewCategoryChange,
  newCategoryId,
  onNewCategoryIdChange,
}: CategoryInputProps) => {
  return (
    <Flex
      display={{ base: "block", md: "flex" }}
      alignItems="center"
      wrap="wrap"
    >
      <Heading fontSize="md" w={{ base: "7rem" }} textAlign="center">
        카테고리 추가
      </Heading>
      <Input
        mx="2px"
        w={{ base: "9rem", md: "10rem" }}
        placeholder="카테고리 이름"
        value={newCategory}
        onChange={onNewCategoryChange}
      />
      <Input
        mx="2px"
        w={{ base: "9rem", md: "10rem" }}
        placeholder="카테고리 ID"
        value={newCategoryId}
        onChange={onNewCategoryIdChange}
      />
      <AuthorityMenu authorityName="관리 권한" />
      <AuthorityMenu authorityName="작성 권한" />
      <Button mx="4px" variant="primary">
        등록
      </Button>
    </Flex>
  );
};
