import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from "@chakra-ui/react";
import { MenuSettingRole, PutRoleData, Role } from "@types";
import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const defaultRoleList = [
  { value: "all", label: "모든 사용자" },
  { value: "overUser", label: "준회원이상" },
  { value: "overKumoh", label: "정회원이상" },
  { value: "onlyAdmin", label: "관리자만" },
  { value: "select", label: "선택 사용자" },
];

interface AuthorityMenuProps {
  authorityName?: string;
  authority?: MenuSettingRole;
  roleList: Role[];
  selectedRole: PutRoleData;
  setSelectedRole: React.Dispatch<React.SetStateAction<PutRoleData>>;
}

export const AuthorityMenu = ({
  authorityName,
  authority,
  roleList,
  selectedRole,
  setSelectedRole,
}: AuthorityMenuProps) => {
  const [isSelect, setIsSelect] = useState<boolean>(false);

  useEffect(() => {
    if (!authority) return;

    const newSelectedRole = {
      option: authority.option,
      roles: roleList
        .filter((role) => authority.roles.includes(role.alias))
        .map((role) => ({ roleName: role.alias, roleId: role.roleId })),
    };

    setSelectedRole(newSelectedRole);
  }, [authority]);

  const onClickCheckbox = (role: Role) => {
    if (selectedRole.roles.some((v) => v.roleId === role.roleId)) {
      setSelectedRole({
        ...selectedRole,
        roles: selectedRole.roles.filter((v) => v.roleId !== role.roleId),
      });
    } else {
      setSelectedRole({
        ...selectedRole,
        roles: [
          ...selectedRole.roles,
          { roleName: role.alias, roleId: role.roleId },
        ],
      });
    }
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        mx="0.25rem"
        my={{ base: "0.25rem", md: 0 }}
      >
        {authorityName || "역할 선택"}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          title="기본 선택"
          type="radio"
          defaultValue={authority?.option || ""}
        >
          {defaultRoleList.map((role) => (
            <MenuItemOption
              key={role.value}
              value={role.value}
              h="28px"
              borderTop="1px solid"
              borderColor="gray.2"
              _hover={{ bg: "blue.1" }}
              onClick={() => (
                role.value === "select"
                  ? setIsSelect(true)
                  : setIsSelect(false),
                setSelectedRole({
                  option: role.value,
                  roles: selectedRole.roles,
                })
              )}
            >
              {role.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title="선택 사용자" type="checkbox">
          {roleList.map((role) => (
            <MenuItemOption
              isChecked={authority?.roles.includes(role.alias)}
              isDisabled={!isSelect}
              key={role.roleId}
              value={role.alias}
              h="28px"
              borderTop="1px solid"
              borderColor="gray.2"
              _hover={{ bg: "blue.1" }}
              onClick={() => onClickCheckbox(role)}
            >
              {role.alias}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

interface AuthoritySettingProps {
  roleList: Role[];
  authority1?: MenuSettingRole;
  authority2?: MenuSettingRole;
  selectedRole1: PutRoleData;
  selectedRole2: PutRoleData;
  setSelectedRole1: React.Dispatch<React.SetStateAction<PutRoleData>>;
  setSelectedRole2: React.Dispatch<React.SetStateAction<PutRoleData>>;
  authorityName1: string;
  authorityName2: string;
}

export const AuthoritySetting = ({
  roleList,
  authority1,
  authority2,
  selectedRole1,
  selectedRole2,
  setSelectedRole1,
  setSelectedRole2,
  authorityName1,
  authorityName2,
}: AuthoritySettingProps) => {
  return (
    <>
      <Heading fontSize="xl">권한 설정</Heading>
      <Flex alignItems="center" my="0.5rem">
        <Heading fontSize="md" w={{ md: "8rem" }}>
          {authorityName1}
        </Heading>
        <AuthorityMenu
          authority={authority1}
          roleList={roleList}
          selectedRole={selectedRole1}
          setSelectedRole={setSelectedRole1}
        />
      </Flex>
      {selectedRole1.roles.length !== 0 && (
        <Flex alignItems="center" my="4px">
          <Text fontWeight="bold" fontSize="md">
            선택된 권한:
          </Text>
          {selectedRole1.roles.map((role) => (
            <Text key={role.roleId} mx="4px">
              {role.roleName}
            </Text>
          ))}
        </Flex>
      )}
      <Flex alignItems="center" my="0.5rem">
        <Heading fontSize="md" w={{ md: "8rem" }}>
          {authorityName2}
        </Heading>
        <AuthorityMenu
          authority={authority2}
          roleList={roleList}
          selectedRole={selectedRole2}
          setSelectedRole={setSelectedRole2}
        />
      </Flex>
      {selectedRole2.roles.length !== 0 && (
        <Flex alignItems="center" my="4px">
          <Text fontWeight="bold" fontSize="md">
            선택된 권한:
          </Text>
          {selectedRole2.roles.map((role) => (
            <Text key={role.roleId} mx="4px">
              {role.roleName}
            </Text>
          ))}
        </Flex>
      )}
    </>
  );
};

export const ExposureTargetAuthoritySetting = ({
  roleList,
  authority,
  selectedRole,
  setSelectedRole,
}: {
  roleList: Role[];
  authority?: MenuSettingRole;
  selectedRole: PutRoleData;
  setSelectedRole: React.Dispatch<React.SetStateAction<PutRoleData>>;
}) => {
  return (
    <Box my="1rem">
      <Heading fontSize="xl">권한 설정</Heading>
      <Flex alignItems="center" my="0.5rem">
        <Heading fontSize="md" w={{ md: "7rem" }}>
          메뉴 노출 대상
        </Heading>
        <AuthorityMenu
          authority={authority}
          roleList={roleList}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      </Flex>
      {selectedRole.roles.length !== 0 && (
        <Flex alignItems="center" my="4px">
          <Text fontWeight="bold" fontSize="md">
            선택된 권한:
          </Text>
          {selectedRole.roles.map((role) => (
            <Text key={role.roleId} mx="4px">
              {role.roleName}
            </Text>
          ))}
        </Flex>
      )}
    </Box>
  );
};
