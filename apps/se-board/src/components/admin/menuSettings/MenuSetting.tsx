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
import {
  MenuInfo as DetailMenuInfo,
  MenuInfomation,
  PutRoleData,
  Role,
} from "@types";
import { useEffect, useState } from "react";

import { useMenuInfo } from "@/hooks";
import { useGetRoleInfos } from "@/react-query/hooks";
import { useGetMenuInfo, usePostMenuInfo } from "@/react-query/hooks/useMenu";
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
  infoRefetch,
}: {
  menuId: number;
  info: DetailMenuInfo;
  roleList: Role[];
  infoRefetch: () => void;
}) => {
  const { mutate: postMenuInfoMutate, isLoading } = usePostMenuInfo();

  const { menuName, menuID, setMenuName, setMenuID, onNameChange, onIDChange } =
    useMenuInfo();
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

  useEffect(() => {
    setMenuName(info.name);
    setMenuID(info.urlId);
  }, [info]);

  const onSettingMenu = () => {
    const menuInfo = {
      name: menuName,
      description: "",
      externalUrl: "",
      urlId: menuID,
      access: {
        option: selectedRole1.option,
        roles: selectedRole1.roles.map((v) => v.roleId),
      },
      expose: {
        option: selectedRole2.option,
        roles: selectedRole2.roles.map((v) => v.roleId),
      },
      manage: {
        option: "",
        roles: [],
      },
      write: {
        option: "",
        roles: [],
      },
    };

    postMenuInfoMutate(
      { categoryId: menuId, data: menuInfo },
      {
        onSuccess: () => {
          infoRefetch();
        },
      }
    );
  };

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
          selectedRole1={selectedRole1}
          selectedRole2={selectedRole2}
          setSelectedRole1={setSelectedRole1}
          setSelectedRole2={setSelectedRole2}
          authorityName1="게시판 접근 권한"
          authorityName2="메뉴 노출 대상"
        />

        <Box textAlign="right" mr={{ md: "1rem" }}>
          <Button
            variant="primary"
            onClick={onSettingMenu}
            isLoading={isLoading}
            loadingText="저장 중"
          >
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
          menuId={menuId}
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
  menuId,
  info,
  roleList,
  infoRefetch,
}: {
  menuId: number;
  info: DetailMenuInfo;
  roleList: Role[];
  infoRefetch: () => void;
}) => {
  const { mutate: postMenuInfoMutate, isLoading } = usePostMenuInfo();

  const {
    menuName,
    menuURL,
    setMenuName,
    setMenuURL,
    onNameChange,
    onURLChange,
  } = useMenuInfo();

  const [selectedRole, setSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });

  useEffect(() => {
    setMenuName(info.name);
    setMenuURL(info.externalUrl);
  });

  const onSettingMenu = () => {
    const menuInfo = {
      name: menuName,
      description: "",
      externalUrl: menuURL,
      urlId: "",
      access: {
        option: "",
        roles: [],
      },
      expose: {
        option: selectedRole.option,
        roles: selectedRole.roles.map((v) => v.roleId),
      },
      manage: {
        option: "",
        roles: [],
      },
      write: {
        option: "",
        roles: [],
      },
    };

    postMenuInfoMutate(
      { categoryId: menuId, data: menuInfo },
      {
        onSuccess: () => {
          infoRefetch();
        },
      }
    );
  };

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
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />

        <Box textAlign="right">
          <Button
            variant="primary"
            mr={{ md: "1rem" }}
            onClick={onSettingMenu}
            isLoading={isLoading}
            loadingText="저장 중"
          >
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
  menuId: number;
  subMenu: MenuInfomation[];
  info: DetailMenuInfo;
  roleList: Role[];
  infoRefetch: () => void;
}

const GroupSetting = ({
  menuId,
  subMenu,
  info,
  roleList,
  infoRefetch,
}: GroupSettingProps) => {
  const { mutate: postMenuInfoMutate, isLoading } = usePostMenuInfo();

  const [subMenuId, setSubMenuId] = useState<number>(subMenu[0].menuId);
  const [selectedRole, setSelectedRole] = useState<PutRoleData>({
    option: "",
    roles: [],
  });

  const { data, refetch: menuDetailRefetch } = useGetMenuInfo(subMenuId);

  const [menuDetail, setMenuDetail] = useState<DetailMenuInfo>({
    name: "",
    description: "",
    externalUrl: "",
    urlId: "",
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
    menuExpose: {
      option: "",
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

  const onSettingMenu = () => {
    const menuInfo = {
      name: menuName,
      description: "",
      externalUrl: "",
      urlId: menuID,
      access: {
        option: "",
        roles: [],
      },
      expose: {
        option: selectedRole.option,
        roles: selectedRole.roles.map((v) => v.roleId),
      },
      manage: {
        option: "",
        roles: [],
      },
      write: {
        option: "",
        roles: [],
      },
    };

    postMenuInfoMutate(
      { categoryId: menuId, data: menuInfo },
      {
        onSuccess: () => {
          infoRefetch();
        },
      }
    );
  };

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
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
              />

              <Divider borderColor="gray.6" my="0.5rem" />

              <MenuAdd />

              <Box textAlign="right">
                <Button
                  variant="primary"
                  mr={{ md: "1rem" }}
                  onClick={onSettingMenu}
                  isLoading={isLoading}
                  loadingText="저장 중"
                >
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
                menuDetailRefetch,
                roleList
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

function creationComponent(
  type: string,
  roleList: Role[],
  infoRefetch: () => void
) {
  switch (type) {
    case "GROUP":
      return <GroupCreation roleList={roleList} infoRefetch={infoRefetch} />;
    case "BOARD":
      return <BoardCreation roleList={roleList} infoRefetch={infoRefetch} />;
    case "EXTERNAL":
      return <ExternalCreation roleList={roleList} infoRefetch={infoRefetch} />;
    default:
      return <></>;
  }
}

const MenuCreation = ({
  roleList,
  infoRefetch,
}: {
  roleList: Role[];
  infoRefetch: () => void;
}) => {
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
      {creationComponent(value, roleList, infoRefetch)}
    </Box>
  );
};

function settingComponent(
  menuId: number,
  type: string,
  subMenu: MenuInfomation[],
  info: DetailMenuInfo,
  infoRefetch: () => void,
  roleList: Role[]
) {
  switch (type) {
    case "BOARD":
      return (
        <BoardSetting
          menuId={menuId}
          info={info}
          roleList={roleList}
          infoRefetch={infoRefetch}
        />
      );
    case "EXTERNAL":
      return (
        <ExternalSetting
          menuId={menuId}
          info={info}
          roleList={roleList}
          infoRefetch={infoRefetch}
        />
      );
    case "MENU":
      return (
        <GroupSetting
          menuId={menuId}
          subMenu={subMenu || []}
          info={info}
          roleList={roleList}
          infoRefetch={infoRefetch}
        />
      );
    case "ADD":
      return <MenuCreation roleList={roleList} infoRefetch={infoRefetch} />;
  }
}

interface MenuSettingProps {
  menuInfo: MenuInfomation;
}

export const MenuSetting = ({ menuInfo }: MenuSettingProps) => {
  const { data, refetch: infoRefetch } = useGetMenuInfo(menuInfo.menuId);
  const { data: RoleList } = useGetRoleInfos();

  const [info, setInfo] = useState<DetailMenuInfo>({
    name: "",
    description: "",
    externalUrl: "",
    urlId: "",
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
    menuExpose: {
      option: "",
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
        infoRefetch,
        roleList
      )}
    </Box>
  );
};
