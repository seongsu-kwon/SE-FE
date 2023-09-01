import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { MenuRoleInfo } from "@types";
import React, { useCallback, useEffect, useState } from "react";

import {
  useGetMenuRoleInfo,
  usePostMenuInfo,
} from "@/react-query/hooks/useMenu";

import { AuthorityMenu } from "./AuthorityMenu";

interface ValueInputProps {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  w?: { base: string; md: string };
}

const ValueInput = ({ value, placeholder, onChange, w }: ValueInputProps) => {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      w={w || { base: "12rem", md: "13rem" }}
      h="2rem"
      ml="0.2rem"
      borderColor="gray.5"
    />
  );
};

interface MenuInfoProps {
  menuType: string | undefined;
  id?: number | undefined;
  menuName: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  menuID: string;
  onIDChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MenuInfo = ({
  menuType = "",
  id,
  menuName,
  onNameChange,
  menuID,
  onIDChange,
}: MenuInfoProps) => {
  const { data } = useGetMenuRoleInfo(id);
  const { mutate, isLoading } = usePostMenuInfo();

  const queryClient = useQueryClient();

  const [roles, setRoles] = useState<MenuRoleInfo>({
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
      option: "",
      roles: [],
    },
  });

  useEffect(() => {
    if (!data) return;

    setRoles({
      access: {
        option: data.access.option,
        roles: [],
      },
      write: {
        option: data.write.option,
        roles: [],
      },
      manage: {
        option: data.manage.option,
        roles: [],
      },
      expose: {
        option: data.menuExpose.option,
        roles: [],
      },
    });
  }, [data]);

  function onModifyMenuInfo() {
    if (!id) return alert("존재하지 않는 메뉴입니다.");

    if (!roles) return alert("권한 설정을 해주세요.");

    mutate(
      {
        categoryId: id,
        data: {
          name: menuName,
          description: "",
          externalUrl: menuType === "EXTERNAL" ? menuID : "",
          urlId: menuType !== "EXTERNAL" ? menuID : "",
          access: {
            option: roles.access.option,
            roles: roles.access.option === "select" ? roles.access.roles : [],
          },
          write: roles.write,
          manage: roles.manage,
          expose: {
            option: roles.expose.option,
            roles: roles.expose.option === "select" ? roles.expose.roles : [],
          },
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["menuRoleInfo", id]);
        },
      }
    );
  }

  const settingMenu = useCallback(() => {
    switch (menuType) {
      case "MENU":
        return {
          menuType: "GROUP",
          menuID: "메뉴 ID",
          authority: ["메뉴 노출 대상"],
        };
      case "BOARD":
        return {
          menuType: "BOARD",
          menuID: "메뉴 ID",
          authority: ["메뉴 노출 대상", "게시판 접근 권한"],
        };
      case "EXTERNAL":
        return {
          menuType: "EXTERNAL",
          menuID: "메뉴 URL",
          authority: ["메뉴 노출 대상"],
        };
      default:
        return {
          menuType: "",
          menuID: "메뉴 ID",
          authority: [],
        };
    }
  }, [menuType]);

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Flex alignItems="center">
        <Heading fontSize="xl">메뉴 타입:</Heading>
        <Text px="0.5rem" fontWeight="semibold" fontSize="lg">
          {settingMenu().menuType}
        </Text>
      </Flex>
      <Divider borderColor="gray.6" my="1rem" />
      <Box>
        <Heading fontSize="xl">메뉴 정보</Heading>
        <Flex alignItems="center" mt="0.5rem">
          <Heading fontSize="md" w={{ md: "5rem" }}>
            메뉴 이름:
          </Heading>
          <ValueInput
            value={menuName}
            onChange={onNameChange}
            placeholder="메뉴 이름"
          />
        </Flex>
        <Flex alignItems="center" mt="0.5rem" mb="1rem">
          <Heading fontSize="md" w={{ md: "5rem" }}>
            {settingMenu().menuID}:
          </Heading>
          <ValueInput
            value={menuID}
            onChange={onIDChange}
            placeholder={settingMenu().menuID}
            w={
              menuType === "EXTERNAL"
                ? { base: "14rem", md: "16rem" }
                : undefined
            }
          />
        </Flex>
      </Box>
      <Divider borderColor="gray.6" my="1rem" />
      <Box>
        <Heading fontSize="xl">권한 설정</Heading>
        {settingMenu().authority.map((authorityMenu, index) => (
          <Flex key={index} alignItems="center" mt="0.5rem">
            <Heading fontSize="md" w={{ md: "8.25rem" }}>
              {authorityMenu}
            </Heading>
            <AuthorityMenu
              roleType={index === 0 ? "expose" : "access"}
              setRoles={setRoles}
              defaultOption={
                index === 0 ? data?.menuExpose.option : data?.access.option
              }
              defaultRoles={
                index === 0 ? data?.menuExpose.roles : data?.access.roles
              }
            />
          </Flex>
        ))}
      </Box>
      <Box textAlign="right">
        <Button
          variant="primary"
          onClick={onModifyMenuInfo}
          isLoading={isLoading}
          loadingText="저장 중"
        >
          저장
        </Button>
      </Box>
    </Box>
  );
};

export const AddMenuInfo = ({
  menuName,
  onNameChange,
  menuID,
  onIDChange,
}: MenuInfoProps) => {
  const [menu, setMenu] = useState<string>("GROUP");
  const [roles, setRoles] = useState<MenuRoleInfo>({
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
      option: "",
      roles: [],
    },
  });

  const settingMenu = useCallback(() => {
    switch (menu) {
      case "GROUP":
        return {
          menuID: "메뉴 ID",
          authority: ["메뉴 노출 대상"],
        };
      case "BOARD":
        return {
          menuID: "메뉴 ID",
          authority: ["메뉴 노출 대상", "게시판 접근 권한"],
        };
      case "EXTERNAL":
        return {
          menuID: "메뉴 URL",
          authority: ["메뉴 노출 대상"],
        };
      default:
        return {
          menuType: "",
          menuID: "메뉴 ID",
          authority: [],
        };
    }
  }, [menu]);

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Flex alignItems="center">
        <Heading fontSize="xl">메뉴 타입:</Heading>
        <RadioGroup onChange={setMenu} value={menu} ml="1rem">
          <Grid templateColumns="repeat(3, 1fr)" gap="0.5rem">
            <Radio value="GROUP">그룹 메뉴</Radio>
            <Radio value="BOARD">게시판 메뉴</Radio>
            <Radio value="EXTERNAL">외부 링크</Radio>
          </Grid>
        </RadioGroup>
      </Flex>
      <Divider borderColor="gray.6" my="1rem" />
      <Box>
        <Heading fontSize="xl">메뉴 정보</Heading>
        <Flex alignItems="center" mt="0.5rem">
          <Heading fontSize="md" w={{ md: "5rem" }}>
            메뉴 이름:
          </Heading>
          <ValueInput
            value={menuName}
            onChange={onNameChange}
            placeholder="메뉴 이름"
          />
        </Flex>
        <Flex alignItems="center" mt="0.5rem" mb="1rem">
          <Heading fontSize="md" w={{ md: "5rem" }}>
            {settingMenu().menuID}:
          </Heading>
          <ValueInput
            value={menuID}
            onChange={onIDChange}
            placeholder={settingMenu().menuID}
          />
        </Flex>
      </Box>
      <Divider borderColor="gray.6" my="1rem" />
      <Box>
        <Heading fontSize="xl">권한 설정</Heading>
        {settingMenu().authority.map((authorityMenu, index) => (
          <Flex key={index} alignItems="center" mt="0.5rem">
            <Heading fontSize="md" w={{ md: "8.25rem" }}>
              {authorityMenu}
            </Heading>
            <AuthorityMenu
              roleType={index === 0 ? "expose" : "access"}
              setRoles={setRoles}
            />
          </Flex>
        ))}
      </Box>
      <Box textAlign="right">
        <Button
          variant="primary"
          // onClick={onSettingMenu}
          // isLoading={isLoading}
          loadingText="저장 중"
        >
          저장
        </Button>
      </Box>
    </Box>
  );
};
