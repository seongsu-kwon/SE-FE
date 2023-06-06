import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { MenuInfo as DetailMenuInfo, MenuInfomation, Role } from "@types";
import { useEffect, useState } from "react";

import { useMenuInfo } from "@/hooks";
import { useGetRoleInfos } from "@/react-query/hooks";
import { useGetMenuInfo } from "@/react-query/hooks/useMenu";
import { semanticColors } from "@/styles";

import {
  AuthoritySetting,
  ExposureTargetAuthoritySetting,
} from "./AuthoritySetting";
import { CategoryInput, CategorySetting } from "./CategorySetting";
import { MenuAdd } from "./MenuAdd";
import {
  BoardCreation,
  ExternalCreation,
  GroupCreation,
} from "./MenuCreations";
import { MenuDelete } from "./MenuDelete";
import { ExternalMenuInfo, MenuInfo } from "./MenuInfo";

const BoardSetting = ({
  menuId,
  info,
  roleList,
}: {
  menuId: number;
  info: DetailMenuInfo;
  roleList: Role[];
}) => {
  const { menuName, menuID, setMenuName, setMenuID, onNameChange, onIDChange } =
    useMenuInfo();
  const [newCategory, setNewCategory] = useState<string>("");
  const [newCategoryId, setNewCategoryId] = useState<string>("");

  useEffect(() => {
    setMenuName(info.name);
    setMenuID(info.urlId);
  });

  return (
    <Box>
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
            BOARD
          </Text>
        </Flex>

        <Divider borderColor="gray.6" my="0.5rem" />

        <MenuInfo
          menuName={menuName}
          onNameChange={onNameChange}
          menuID={menuID}
          onIDChange={onIDChange}
        />

        <Divider borderColor="gray.6" my="0.5rem" />

        <AuthoritySetting
          roleList={roleList}
          authority1={info.access}
          authority2={info.menuExpose}
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
          <CategorySetting menuId={menuId} roleList={roleList} />
        </Box>
        <CategoryInput
          newCategory={newCategory}
          onNewCategoryChange={(e) => setNewCategory(e.target.value)}
          newCategoryId={newCategoryId}
          onNewCategoryIdChange={(e) => setNewCategoryId(e.target.value)}
          roleList={roleList}
        />
      </Box>

      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <MenuDelete />
      </Box>
    </Box>
  );
};

const ExternalSetting = ({
  info,
  roleList,
}: {
  info: DetailMenuInfo;
  roleList: Role[];
}) => {
  const {
    menuName,
    menuURL,
    setMenuName,
    setMenuURL,
    onNameChange,
    onURLChange,
  } = useMenuInfo();

  useEffect(() => {
    setMenuName(info.name);
    setMenuURL(info.externalUrl);
  });

  return (
    <Box>
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
            EXTERNAL
          </Text>
        </Flex>

        <Divider borderColor="gray.6" my="0.5rem" />

        <ExternalMenuInfo
          menuName={menuName}
          onNameChange={onNameChange}
          menuID={menuURL}
          onIDChange={onURLChange}
        />

        <Divider borderColor="gray.6" my="0.5rem" />

        <ExposureTargetAuthoritySetting
          authority={info.menuExpose}
          roleList={roleList}
        />

        <Box textAlign="right">
          <Button variant="primary" mr={{ md: "1rem" }}>
            저장
          </Button>
        </Box>
      </Box>

      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <MenuDelete />
      </Box>
    </Box>
  );
};

interface GroupSettingProps {
  subMenu: MenuInfomation[];
  info: DetailMenuInfo;
  roleList: Role[];
}

const GroupSetting = ({ subMenu, info, roleList }: GroupSettingProps) => {
  const [subMenuId, setSubMenuId] = useState<number>(subMenu[0].menuId);

  const { data } = useGetMenuInfo(subMenuId);

  const [menuDetail, setMenuDetail] = useState<DetailMenuInfo>({
    name: "",
    description: "",
    externalUrl: "",
    urlId: "",
    access: {
      option: "ALL",
      roles: [],
    },
    write: {
      option: "ALL",
      roles: [],
    },
    manage: {
      option: "ALL",
      roles: [],
    },
    menuExpose: {
      option: "ALL",
      roles: [],
    },
  });
  const { menuName, menuID, setMenuName, setMenuID, onNameChange, onIDChange } =
    useMenuInfo();

  useEffect(() => {
    setMenuName(info.name);
    setMenuID(info.urlId);
  });

  useEffect(() => {
    if (!data) return;

    setMenuDetail(data);
  }, [data]);

  return (
    <Box>
      <Tabs>
        <Box
          mt="20px"
          bgColor="white"
          py="1rem"
          px={{ base: "0.75rem", md: "1rem" }}
          rounded="3xl"
        >
          <TabList>
            <Tab
              wordBreak="keep-all"
              _selected={{ borderColor: semanticColors.primary }}
            >
              그룹 메뉴 설정
            </Tab>
            {subMenu.map((menu) => (
              <Tab
                key={menu.menuId}
                wordBreak="keep-all"
                _selected={{ borderColor: semanticColors.primary }}
                onClick={() => setSubMenuId(menu.menuId)}
              >
                {menu.name}
              </Tab>
            ))}
          </TabList>
        </Box>
        <TabPanels>
          <TabPanel my="20px" p="0">
            <Box
              py="1rem"
              px={{ base: "0.75rem", md: "1rem" }}
              bgColor="white"
              rounded="3xl"
            >
              <Flex alignItems="center">
                <Heading fontSize="xl">메뉴 타입:</Heading>
                <Text px="0.5rem" fontWeight="semibold" fontSize="lg">
                  GROUP
                </Text>
              </Flex>

              <Divider borderColor="gray.6" my="0.5rem" />

              <MenuInfo
                menuName={menuName}
                onNameChange={onNameChange}
                menuID={menuID}
                onIDChange={onIDChange}
              />

              <Divider borderColor="gray.6" my="0.5rem" />

              <ExposureTargetAuthoritySetting
                authority={info.menuExpose}
                roleList={roleList}
              />

              <Divider borderColor="gray.6" my="0.5rem" />

              <MenuAdd />

              <Box textAlign="right">
                <Button variant="primary" mr={{ md: "1rem" }}>
                  저장
                </Button>
              </Box>
            </Box>

            <Box
              mt="20px"
              bgColor="white"
              py="1rem"
              px={{ base: "0.75rem", md: "1rem" }}
              rounded="3xl"
            >
              <MenuDelete />
            </Box>
          </TabPanel>
          {subMenu.map((menu) => (
            <TabPanel key={menu.menuId} my="20px" p="0">
              {settingComponent(
                menu.menuId,
                menu.type,
                menu.subMenu,
                menuDetail,
                roleList
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

function creationComponent(type: string, roleList: Role[]) {
  switch (type) {
    case "GROUP":
      return <GroupCreation roleList={roleList} />;
    case "BOARD":
      return <BoardCreation roleList={roleList} />;
    case "EXTERNAL":
      return <ExternalCreation roleList={roleList} />;
    default:
      return <></>;
  }
}

const MenuCreation = ({ roleList }: { roleList: Role[] }) => {
  const [value, setValue] = useState("GROUP");

  return (
    <Box>
      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Heading fontSize="xl">메뉴 타입</Heading>
        <RadioGroup onChange={setValue} value={value} mt="1rem">
          <Stack direction="row">
            <Radio value="GROUP">그룹 메뉴</Radio>
            <Radio value="BOARD">게시판</Radio>
            <Radio value="EXTERNAL">외부링크</Radio>
          </Stack>
        </RadioGroup>
      </Box>
      {creationComponent(value, roleList)}
    </Box>
  );
};

function settingComponent(
  menuId: number,
  type: string,
  subMenu: MenuInfomation[],
  info: DetailMenuInfo,
  roleList: Role[]
) {
  switch (type) {
    case "BOARD":
      return <BoardSetting menuId={menuId} info={info} roleList={roleList} />;
    case "EXTERNAL":
      return <ExternalSetting info={info} roleList={roleList} />;
    case "MENU":
      return (
        <GroupSetting subMenu={subMenu || []} info={info} roleList={roleList} />
      );
    case "ADD":
      return <MenuCreation roleList={roleList} />;
  }
}

interface MenuSettingProps {
  menuInfo: MenuInfomation;
}

export const MenuSetting = ({ menuInfo }: MenuSettingProps) => {
  const { data } = useGetMenuInfo(menuInfo.menuId);
  const { data: RoleList } = useGetRoleInfos();

  const [info, setInfo] = useState<DetailMenuInfo>({
    name: "",
    description: "",
    externalUrl: "",
    urlId: "",
    access: {
      option: "ALL",
      roles: [],
    },
    write: {
      option: "ALL",
      roles: [],
    },
    manage: {
      option: "ALL",
      roles: [],
    },
    menuExpose: {
      option: "ALL",
      roles: [],
    },
  });
  const [roleList, setRoleList] = useState<Role[]>([]);

  useEffect(() => {
    if (!data) return;

    setInfo(data);
  }, [data]);

  useEffect(() => {
    if (!RoleList) return;

    setRoleList(RoleList.roles);
  }, [RoleList]);

  return (
    <Box>
      {settingComponent(
        menuInfo.menuId,
        menuInfo.type,
        menuInfo.subMenu,
        info,
        roleList
      )}
    </Box>
  );
};
