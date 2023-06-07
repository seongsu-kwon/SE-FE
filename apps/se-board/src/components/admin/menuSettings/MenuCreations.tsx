import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import { PutRoleData, Role } from "@types";
import { useState } from "react";

import { useMenuInfo } from "@/hooks";
import { usePostAddCategory } from "@/react-query/hooks/useMenu";

import {
  AuthoritySetting,
  ExposureTargetAuthoritySetting,
} from "./AuthoritySetting";
import { CategoryInput, CategorySetting } from "./CategorySetting";
import { MenuAdd } from "./MenuAdd";
import { ExternalMenuInfo, MenuInfo } from "./MenuInfo";

interface MenuCreationProps {
  roleList: Role[];
  infoRefetch: () => void;
}

export const GroupCreation = ({ roleList, infoRefetch }: MenuCreationProps) => {
  const { mutate, isLoading } = usePostAddCategory();

  const { menuName, menuID, onNameChange, onIDChange } = useMenuInfo();
  const [selectedRole, setSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });

  const onAddGroup = () => {
    mutate(
      {
        categoryType: "MENU",
        data: {
          superCategoryId: null,
          name: menuName,
          urlId: menuID,
          externalUrl: "",
          description: "",
          access: {
            option: "",
            roles: [],
          },
          write: {
            option: "",
            roles: [],
          },
          manage: {
            option: "",
            roles: [],
          },
          expose: {
            option: selectedRole.option,
            roles: selectedRole.roles.map((role) => role.roleId),
          },
        },
      },
      {
        onSuccess: () => {
          infoRefetch();
        },
      }
    );
  };

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

      <ExposureTargetAuthoritySetting
        roleList={roleList}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      <Divider borderColor="gray.6" my="0.5rem" />

      <MenuAdd />
      <Box textAlign="right">
        <Button
          variant="primary"
          mr={{ md: "1rem" }}
          onClick={onAddGroup}
          isLoading={isLoading}
          loadingText="등록 중"
        >
          저장
        </Button>
      </Box>
    </Box>
  );
};

export const BoardCreation = ({ roleList, infoRefetch }: MenuCreationProps) => {
  const { menuName, menuID, onNameChange, onIDChange } = useMenuInfo();

  const [selectedRole1, setSelectedRole1] = useState<PutRoleData>({
    option: "",
    roles: [],
  });
  const [selectedRole2, setSelectedRole2] = useState<PutRoleData>({
    option: "",
    roles: [],
  });
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
          roleList={roleList}
          selectedRole1={selectedRole1}
          selectedRole2={selectedRole2}
          setSelectedRole1={setSelectedRole1}
          setSelectedRole2={setSelectedRole2}
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
          <CategorySetting menuId={-1} roleList={roleList} />
        </Box>
        <CategoryInput
          menuId={0} //TODO: menuId 받아서 넣어주기
          newCategory={newCategory}
          onNewCategoryChange={(e) => setNewCategory(e.target.value)}
          newCategoryId={newCategoryId}
          onNewCategoryIdChange={(e) => setNewCategoryId(e.target.value)}
          roleList={roleList}
        />
      </Box>
    </>
  );
};

export const ExternalCreation = ({
  roleList,
  infoRefetch,
}: MenuCreationProps) => {
  const { mutate, isLoading } = usePostAddCategory();

  const { menuName, menuURL, onNameChange, onURLChange } = useMenuInfo();
  const [selectedRole, setSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });

  const onAddCategory = () => {
    mutate(
      {
        categoryType: "EXTERNAL",
        data: {
          superCategoryId: null,
          name: menuName,
          urlId: "",
          externalUrl: menuURL,
          description: "",
          access: {
            option: "",
            roles: [],
          },
          write: {
            option: "",
            roles: [],
          },
          manage: {
            option: "",
            roles: [],
          },
          expose: {
            option: selectedRole.option,
            roles: selectedRole.roles.map((role) => role.roleId),
          },
        },
      },
      {
        onSuccess: () => {
          infoRefetch();
        },
      }
    );
  };

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

      <ExposureTargetAuthoritySetting
        roleList={roleList}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />

      <Box textAlign="right">
        <Button
          variant="primary"
          mr={{ md: "1rem" }}
          onClick={onAddCategory}
          isLoading={isLoading}
          loadingText="등록 중"
        >
          저장
        </Button>
      </Box>
    </Box>
  );
};
