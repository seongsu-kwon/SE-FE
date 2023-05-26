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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { AuthorityMenu } from "./AuthoritySetting";

const data = [
  {
    name: "학사",
    id: "degree",
    manage: ["관리자", "준회원", "정회원"],
    write: ["관리자만"],
  },
  { name: "일반", id: "general", manage: ["관리자만"], write: ["관리자만"] },
  { name: "취업", id: "employment", manage: ["관리자만"], write: ["관리자만"] },
  { name: "행사", id: "event", manage: ["관리자만"], write: ["관리자만"] },
  {
    name: "프로젝트",
    id: "project",
    manage: ["관리자만"],
    write: ["관리자만"],
  },
];

interface CategoryItemProps {
  name: string;
  id: string;
  manage: string[];
  write: string[];
}

const CategoryItem = ({ name, id, manage, write }: CategoryItemProps) => {
  const [isModify, setIsModify] = useState(false);
  const [modifyName, setModifyName] = useState(name);
  const [modifyId, setModifyId] = useState(id);

  return !isModify ? (
    <>
      <Box fontSize={{ base: "14px", md: "18px" }}>{name}</Box>
      <Box fontSize={{ base: "14px", md: "18px" }}>{id}</Box>
      <Box maxH="2.5rem" overflow="auto" wordBreak="keep-all">
        {manage.map((value) => (
          <Box>{value}</Box>
        ))}
      </Box>
      <Box maxH="2.5rem" overflow="auto">
        {write.map((value) => (
          <Box>{value}</Box>
        ))}
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

export const CategorySetting = () => {
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
        추가/삭제
      </Box>
      {data.map((item) => (
        <CategoryItem
          name={item.name}
          id={item.id}
          manage={item.manage}
          write={item.write}
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
