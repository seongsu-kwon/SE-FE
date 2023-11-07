/* 메뉴 타입, 메뉴 id props로 전달받아 메뉴 상세 정보 조회 */

import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { AdminSettingRole, MenuInfomation, MenuSettingRole } from "@types";
import React, { useEffect, useState } from "react";

import { useMenuInfo } from "@/hooks";
import { adminMenuRoleList } from "@/utils/menuUtils";

import { AdminAuthorityMenu } from "./AuthorityMenu";
import { CategoryManage } from "./CategoryManage";
import { MenuDelete } from "./MenuDelete";
import { AddMenuInfo, MenuInfo } from "./MenuInfo";

interface MenuEditProps {
  menuInfo: MenuInfomation | undefined;
}

export const MenuEdit = ({ menuInfo }: MenuEditProps) => {
  const { menuName, menuID, setMenuName, setMenuID } = useMenuInfo();

  useEffect(() => {
    if (!menuInfo) return;
    setMenuName(menuInfo.name);
    setMenuID(menuInfo.urlId);
  }, [menuInfo]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };

  const onIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuID(e.target.value);
  };

  return (
    <Box>
      <MenuInfo
        menuInfo={menuInfo}
        menuName={menuName}
        menuID={menuID}
        onNameChange={onNameChange}
        onIDChange={onIDChange}
      />
      {menuInfo?.type === "BOARD" && (
        <CategoryManage menuId={menuInfo.menuId} subMenus={menuInfo.subMenus} />
      )}
      <MenuDelete menuType={menuInfo?.type} menuId={menuInfo?.menuId} />
    </Box>
  );
};

export const AddMenu = () => {
  const { menuName, menuID, setMenuName, setMenuID } = useMenuInfo();

  return (
    <Box>
      <AddMenuInfo
        menuInfo={undefined}
        menuName={menuName}
        menuID={menuID}
        onNameChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setMenuName(e.target.value);
        }}
        onIDChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setMenuID(e.target.value);
        }}
      />
    </Box>
  );
};

/* 
  group - 메뉴정보, 하위메뉴, 메뉴 삭제
  board - 메뉴정보, 메뉴삭제, 캬테고리 관리
  External - 메뉴정보, 메뉴삭제
*/

interface AdminMenuContainerProps {
  heading: string;
  menu: MenuSettingRole[];
  adminMenuRoleListRef: React.MutableRefObject<AdminSettingRole | undefined>;
}

export const AdminMenuContainer = ({
  heading,
  menu,
  adminMenuRoleListRef,
}: AdminMenuContainerProps) => {
  const [menuInfo, setMenuInfo] = useState<MenuSettingRole[]>(menu);

  useEffect(() => {
    setMenuInfo(menu);
  }, [menu]);

  useEffect(() => {
    if (!adminMenuRoleListRef.current) return;

    const newRoleList = {
      ...adminMenuRoleListRef.current,
      ...adminMenuRoleList(heading, menuInfo),
    };

    adminMenuRoleListRef.current = newRoleList;
  }, [menuInfo]);

  return (
    <Box w="100%" wordBreak="keep-all">
      <Heading fontSize="xl">{heading}</Heading>
      <Grid
        templateColumns={{ lg: "repeat(2, 1fr)" }}
        rowGap="0.5rem"
        w="100%"
        mx="2rem"
      >
        {menu.map((item, index) => (
          <Flex key={index} alignItems="center" my="0.5rem" gap="0.75rem">
            <Text fontWeight="550" w="6rem">
              {item.name}
            </Text>
            <AdminAuthorityMenu
              index={index}
              setMenuInfo={setMenuInfo}
              defaultOption={item.option}
              defaultRoles={item.roles}
            />
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};
