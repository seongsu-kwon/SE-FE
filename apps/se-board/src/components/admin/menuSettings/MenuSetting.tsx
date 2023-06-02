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
import { MenuInfomation } from "@types";
import { useEffect, useState } from "react";

import { useMenuInfo } from "@/hooks";
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

const BoardSetting = ({ menuId }: { menuId: number }) => {
  const { menuName, menuID, setMenuName, setMenuID, onNameChange, onIDChange } =
    useMenuInfo();
  const [newCategory, setNewCategory] = useState<string>("");
  const [newCategoryId, setNewCategoryId] = useState<string>("");

  useEffect(() => {
    setMenuName("공지사항");
    setMenuID("notice");
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
          <CategorySetting menuId={menuId} />
        </Box>
        <CategoryInput
          newCategory={newCategory}
          onNewCategoryChange={(e) => setNewCategory(e.target.value)}
          newCategoryId={newCategoryId}
          onNewCategoryIdChange={(e) => setNewCategoryId(e.target.value)}
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

const ExternalSetting = () => {
  const {
    menuName,
    menuURL,
    setMenuName,
    setMenuURL,
    onNameChange,
    onURLChange,
  } = useMenuInfo();

  useEffect(() => {
    setMenuName("채용");
    setMenuURL("https://cs.kumoh.ac.kr/cs/sub0602.do");
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

        <ExposureTargetAuthoritySetting />

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
}

const GroupSetting = ({ subMenu }: GroupSettingProps) => {
  const { menuName, menuID, setMenuName, setMenuID, onNameChange, onIDChange } =
    useMenuInfo();

  useEffect(() => {
    setMenuName("예약");
    setMenuID("reservation");
  });

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

              <ExposureTargetAuthoritySetting />

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
              {settingComponent(menu.menuId, menu.type, menu.subMenu)}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

function creationComponent(type: string) {
  switch (type) {
    case "GROUP":
      return <GroupCreation />;
    case "BOARD":
      return <BoardCreation />;
    case "EXTERNAL":
      return <ExternalCreation />;
    default:
      return <></>;
  }
}

const MenuCreation = () => {
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
      {creationComponent(value)}
    </Box>
  );
};

function settingComponent(
  menuId: number,
  type: string,
  subMenu: MenuInfomation[]
) {
  switch (type) {
    case "BOARD":
      return <BoardSetting menuId={menuId} />;
    case "EXTERNAL":
      return <ExternalSetting />;
    case "MENU":
      return <GroupSetting subMenu={subMenu || []} />;
    case "ADD":
      return <MenuCreation />;
  }
}

interface MenuSettingProps {
  menuInfo: MenuInfomation;
}

export const MenuSetting = ({ menuInfo }: MenuSettingProps) => {
  return (
    <Box>
      {settingComponent(menuInfo.menuId, menuInfo.type, menuInfo.subMenu)}
    </Box>
  );
};
