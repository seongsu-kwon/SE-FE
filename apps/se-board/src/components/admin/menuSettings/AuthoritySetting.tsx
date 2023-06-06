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
} from "@chakra-ui/react";
import { MenuSettingRole, Role } from "@types";
import { useState } from "react";
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
}

export const AuthorityMenu = ({
  authorityName,
  authority,
  roleList,
}: AuthorityMenuProps) => {
  const [isSelect, setIsSelect] = useState<boolean>(false);

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
              onClick={() =>
                role.value === "select" ? setIsSelect(true) : setIsSelect(false)
              }
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
              value={role.name}
              h="28px"
              borderTop="1px solid"
              borderColor="gray.2"
              _hover={{ bg: "blue.1" }}
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
  authorityName1: string;
  authorityName2: string;
}

export const AuthoritySetting = ({
  roleList,
  authority1,
  authority2,
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
        <AuthorityMenu authority={authority1} roleList={roleList} />
      </Flex>
      <Flex alignItems="center" my="0.5rem">
        <Heading fontSize="md" w={{ md: "8rem" }}>
          {authorityName2}
        </Heading>
        <AuthorityMenu authority={authority2} roleList={roleList} />
      </Flex>
    </>
  );
};

export const ExposureTargetAuthoritySetting = ({
  roleList,
  authority,
}: {
  roleList: Role[];
  authority?: MenuSettingRole;
}) => {
  return (
    <Box my="1rem">
      <Heading fontSize="xl">권한 설정</Heading>
      <Flex alignItems="center" my="0.5rem">
        <Heading fontSize="md" w={{ md: "7rem" }}>
          메뉴 노출 대상
        </Heading>
        <AuthorityMenu authority={authority} roleList={roleList} />
      </Flex>
    </Box>
  );
};
