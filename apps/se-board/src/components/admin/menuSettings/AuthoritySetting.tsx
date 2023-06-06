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
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const roleList = {
  default: [
    { value: "all", label: "모든 사용자" },
    { value: "associate", label: "준회원이상" },
    { value: "regular", label: "정회원이상" },
    { value: "admin", label: "관리자만" },
    { value: "select", label: "선택 사용자" },
  ],
  select: [
    { value: "associate", label: "준회원" },
    { value: "regular", label: "정회원" },
    { value: "admin", label: "관리자" },
    { value: "student", label: "학생회" },
  ],
};

interface AuthorityMenuProps {
  authorityName?: string;
}

export const AuthorityMenu = ({ authorityName }: AuthorityMenuProps) => {
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
        <MenuOptionGroup title="기본 선택" type="radio">
          {roleList.default.map((role) => (
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
          {roleList.select.map((role) => (
            <MenuItemOption
              isDisabled={!isSelect}
              key={role.value}
              value={role.value}
              h="28px"
              borderTop="1px solid"
              borderColor="gray.2"
              _hover={{ bg: "blue.1" }}
            >
              {role.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

interface AuthoritySettingProps {
  authorityName1: string;
  authorityName2: string;
}

export const AuthoritySetting = ({
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
        <AuthorityMenu />
      </Flex>
      <Flex alignItems="center" my="0.5rem">
        <Heading fontSize="md" w={{ md: "8rem" }}>
          {authorityName2}
        </Heading>
        <AuthorityMenu />
      </Flex>
    </>
  );
};

export const ExposureTargetAuthoritySetting = () => {
  return (
    <Box my="1rem">
      <Heading fontSize="xl">권한 설정</Heading>
      <Flex alignItems="center" my="0.5rem">
        <Heading fontSize="md" w={{ md: "7rem" }}>
          메뉴 노출 대상
        </Heading>
        <AuthorityMenu />
      </Flex>
    </Box>
  );
};
