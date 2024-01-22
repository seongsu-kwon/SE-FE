import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MainPageMenu } from "@types";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import { LayoutExample } from "@/components/layouts";
import {
  useGetMainPageMenus,
  useGetSelectedMainPageMenus,
  usePutMainPageMenus,
} from "@/react-query/hooks/useMenu";
import { errorHandle } from "@/utils/errorHandling";

export const MenuItemManage = () => {
  const { data } = useGetMainPageMenus();
  const { data: selectedMenu, refetch } = useGetSelectedMainPageMenus();
  const { mutate, isLoading } = usePutMainPageMenus();

  const [menuList, setMenuList] = useState<
    (MainPageMenu & { isChecked: boolean })[]
  >([]);

  const toast = useToast();

  useEffect(() => {
    if (!data || !selectedMenu) return;

    const newMenuList = data.map((value) => ({
      ...value,
      isChecked:
        selectedMenu.find((menu) => menu.menuId === value.categoryId) !==
        undefined,
    }));
    setMenuList(newMenuList);
  }, [data, selectedMenu]);

  const onClick = (value: MainPageMenu) => {
    const index = menuList.findIndex((v) => v.categoryId === value.categoryId);
    const newMenuList = [...menuList];
    newMenuList[index].isChecked = !newMenuList[index].isChecked;
    setMenuList(newMenuList);
  };

  const onUpdate = () => {
    if (menuList.filter((v) => v.isChecked).length < 1)
      return alert("메뉴를 선택해 주세요.");

    const updateMenuList = new Array<number>();
    menuList
      .filter((v) => v.isChecked)
      .map((v) => updateMenuList.push(v.categoryId));

    mutate(updateMenuList, {
      onSuccess: () => {
        refetch();
        toast({
          title: "메인 페이지 메뉴 배치가 변경되었어요!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        errorHandle(error);
      },
    });
  };

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Text
        fontWeight="semibold"
        fontSize={{ base: "xl", md: "2xl" }}
        mb="20px"
        borderBottom="1px solid"
        borderColor="gray.5"
      >
        메인 페이지 메뉴 배치
      </Text>
      <Flex alignItems="start" mb="0.5rem">
        <Heading fontSize="lg" mr="4px">
          메뉴 선택
        </Heading>
        <Text>메인 페이지에 배치할 메뉴를 선택해 주세요.(다중 선택 가능)</Text>
      </Flex>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<BsChevronDown />}
          mr="0.25rem"
          my={{ base: "0.25rem", md: 0 }}
        >
          메뉴
        </MenuButton>
        <MenuList>
          {menuList.map((value) => (
            <MenuItemOption
              key={value.categoryId}
              value={String(value.categoryId)}
              type="checkbox"
              isChecked={value.isChecked}
              onClick={() => onClick(value)}
            >
              {value.name}
            </MenuItemOption>
          ))}
        </MenuList>
      </Menu>

      {menuList.find((v) => v.isChecked === true) !== undefined && (
        <Flex alignItems="center" my="4px">
          <Text fontWeight="bold" fontSize="xl">
            선택된 메뉴:
          </Text>
          {menuList.map(
            (value) =>
              value.isChecked && (
                <Text key={value.categoryId} mx="4px">
                  {value.name}
                </Text>
              )
          )}
        </Flex>
      )}

      <LayoutExample menuList={menuList} />

      <Flex justifyContent="flex-end">
        <Button
          variant="primary"
          mr="0.5rem"
          isLoading={isLoading}
          loadingText="등록 중..."
          isDisabled={menuList.find((v) => v.isChecked === true) === undefined}
          onClick={() => {
            onUpdate();
          }}
        >
          등록
        </Button>
      </Flex>
    </Box>
  );
};
