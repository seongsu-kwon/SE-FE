import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { MenuInfomation, PutSubMenu } from "@types";
import { useRef } from "react";
import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useGetRoleInfos } from "@/react-query/hooks";
import { usePutGroupSubMenu } from "@/react-query/hooks/useMenu";
import { allMenuListState, newSEMenuState } from "@/store/menu";
import { getPossibleSubMenus } from "@/utils/menuUtils";

import { SubMenuCard } from "./SubMenuCard";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  possibleSubMenuList: MenuInfomation[];
  menuInfo: MenuInfomation | undefined;
}

const AddAlert = ({
  isOpen,
  onClose,
  possibleSubMenuList,
  menuInfo,
}: AlertProps) => {
  const { data: roles } = useGetRoleInfos();
  const { mutate, isLoading } = usePutGroupSubMenu();

  const cancelRef = useRef<HTMLButtonElement>(null);
  const fromMenu = useRef<PutSubMenu | undefined>(undefined);
  const fromMenuId = useRef<number | undefined>(undefined);

  const queryClient = useQueryClient();

  const setNewSEMenu = useSetRecoilState(newSEMenuState);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const menu = possibleSubMenuList.find(
      (v) => v.menuId === Number(e.target.value)
    );

    const accessRole = [];
    if (menu?.access !== null) {
      for (const role of menu?.access.roles || []) {
        const roleId = roles?.find((v) => v.name === role)?.roleId;
        if (roleId) accessRole.push(roleId);
      }
    }

    const exposeRole = [];
    for (const role of menu?.expose.roles || []) {
      const roleId = roles?.find((v) => v.name === role)?.roleId;
      if (roleId) exposeRole.push(roleId);
    }

    const putMenu: PutSubMenu | undefined =
      menu && menuInfo
        ? {
            name: menu.name,
            superMenuId: menuInfo.menuId,
            description: "",
            urlId: menu.urlId,
            externalUrl: menu.urlId,
            access: menu.access
              ? {
                  option: menu.access.option,
                  roles: accessRole,
                }
              : null,
            write: menu.write ? { option: menu.write.option, roles: [] } : null,
            expose: {
              option: menu.expose.option,
              roles: exposeRole,
            },
            manage: menu.manage
              ? {
                  option: menu.manage.option,
                  roles: [],
                }
              : null,
          }
        : undefined;

    fromMenu.current = putMenu;
    fromMenuId.current = menu?.menuId;
  };

  const onAdd = () => {
    if (!fromMenu.current || !fromMenuId.current)
      return alert("메뉴를 선택해주세요.");

    mutate(
      { categoryId: fromMenuId.current, data: fromMenu.current },
      {
        onSuccess: () => {
          fromMenu.current = undefined;
          fromMenuId.current = undefined;
          setNewSEMenu(menuInfo?.name || "");
          queryClient.invalidateQueries(["adminMenuList"]);
          onClose();
        },
      }
    );
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="xl" fontWeight="bold">
            하위 메뉴 추가
          </AlertDialogHeader>

          <AlertDialogBody>
            <FormControl display="flex" alignItems="center">
              <FormLabel
                fontWeight="bold"
                w="fit-content"
                wordBreak="keep-all"
                mb="0.25rem"
              >
                메뉴 선택
              </FormLabel>
              <Select
                w="13rem"
                mr="4px"
                border="1px solid"
                borderColor="gray.3"
                onChange={onChange}
              >
                <option value="" hidden>
                  추가 가능 메뉴
                </option>
                {possibleSubMenuList.map((menu) => (
                  <option key={menu.menuId} value={menu.menuId}>
                    {menu.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button variant="primary" onClick={onAdd} isLoading={isLoading}>
                추가
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

interface GroupSubMenuManageProps {
  menuInfo: MenuInfomation | undefined;
}

export const GroupSubMenuManage = ({ menuInfo }: GroupSubMenuManageProps) => {
  const allMenuList = useRecoilValue(allMenuListState);
  const possibleSubMenuList = getPossibleSubMenus(allMenuList);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Heading fontSize="xl" mb="1rem">
        하위메뉴 관리
      </Heading>
      <SimpleGrid
        mx="auto"
        w={{ sm: "100%", md: "fit-content" }}
        columns={[2, 2, 3]}
        rowGap="2rem"
        columnGap="3rem"
      >
        {menuInfo?.subMenus.map((menu, idx) => (
          <SubMenuCard key={idx} menu={menu} superMenuName={menuInfo.name} />
        ))}
      </SimpleGrid>
      <Flex justifyContent="end" mt="0.75rem">
        <Button
          variant="primary"
          w="8.75rem"
          h="2.5rem"
          fontSize="16px"
          leftIcon={<BsPlusLg />}
          onClick={onOpen}
        >
          하위 메뉴 추가
        </Button>
      </Flex>
      <AddAlert
        isOpen={isOpen}
        onClose={onClose}
        menuInfo={menuInfo}
        possibleSubMenuList={possibleSubMenuList}
      />
    </Box>
  );
};
