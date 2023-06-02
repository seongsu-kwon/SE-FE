import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import { useState } from "react";

import { useMenuInfo } from "@/hooks";

import {
  AuthoritySetting,
  ExposureTargetAuthoritySetting,
} from "./AuthoritySetting";
import { CategoryInput, CategorySetting } from "./CategorySetting";
import { MenuAdd } from "./MenuAdd";
import { ExternalMenuInfo, MenuInfo } from "./MenuInfo";

export const GroupCreation = () => {
  const { menuName, menuID, onNameChange, onIDChange } = useMenuInfo();

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <MenuInfo
        menuName={menuName}
        onNameChange={onNameChange}
        menuID={menuID}
        onIDChange={onIDChange}
      />

      <Divider borderColor="gray.6" my="0.5rem" />

      <ExposureTargetAuthoritySetting />

      <Divider borderColor="gray.6" my="0.5rem" />

      <MenuAdd />
      <Box textAlign="right">
        <Button variant="primary" mr={{ md: "1rem" }}>
          저장
        </Button>
      </Box>
    </Box>
  );
};

export const BoardCreation = () => {
  const { menuName, menuID, onNameChange, onIDChange } = useMenuInfo();
  const [newCategory, setNewCategory] = useState<string>("");
  const [newCategoryId, setNewCategoryId] = useState<string>("");

  return (
    <>
      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <MenuInfo
          menuName={menuName}
          onNameChange={onNameChange}
          menuID={menuID}
          onIDChange={onIDChange}
        />

        <Divider borderColor="gray.6" my="0.5rem" />

        <AuthoritySetting
          authorityName1="게시판 접근 권한"
          authorityName2="메뉴 노출 대상"
        />

        <Box textAlign="right" mr={{ md: "1rem" }}>
          <Button variant="primary">저장</Button>
        </Box>
      </Box>
      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Heading fontSize="xl">카테고리 관리</Heading>
        <Box
          my="1rem"
          maxH="20rem"
          border="1px solid"
          borderColor="gray.3"
          overflowY="auto"
        >
          <CategorySetting menuId={-1} />
        </Box>
        <CategoryInput
          newCategory={newCategory}
          onNewCategoryChange={(e) => setNewCategory(e.target.value)}
          newCategoryId={newCategoryId}
          onNewCategoryIdChange={(e) => setNewCategoryId(e.target.value)}
        />
      </Box>
    </>
  );
};

export const ExternalCreation = () => {
  const { menuName, menuURL, onNameChange, onURLChange } = useMenuInfo();

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <ExternalMenuInfo
        menuName={menuName}
        onNameChange={onNameChange}
        menuID={menuURL}
        onIDChange={onURLChange}
      />

      <Divider borderColor="gray.6" my="0.5rem" />

      <ExposureTargetAuthoritySetting />

      <Box textAlign="right">
        <Button variant="primary" mr={{ md: "1rem" }}>
          저장
        </Button>
      </Box>
    </Box>
  );
};
