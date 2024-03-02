import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Button,
  Center,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FormControl,
  FormLabel,
  Hide,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Switch,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { AdminMenuDashBoard } from "@types";
import { useEffect, useState } from "react";
import React from "react";
import { IconType } from "react-icons";
import {
  BsCollection,
  BsFolder,
  BsList,
  BsPersonCircle,
  BsPersonLinesFill,
  BsWrenchAdjustable,
} from "react-icons/bs";
import { Outlet, useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import { ReactComponent as SELogo } from "@/assets/images/se_logo.svg";
import { useNavigatePage } from "@/hooks";
import { useGetAdminMenus } from "@/react-query/hooks";
import { useLogout } from "@/react-query/hooks/auth";
import { useUserState } from "@/store/user";
import { openColors, semanticColors } from "@/styles";

interface LinkItemProps {
  key: string;
  name: string;
  icon?: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { key: "menu", name: "메뉴 관리", icon: BsFolder },
  { key: "person", name: "회원 관리", icon: BsPersonLinesFill },
  { key: "content", name: "콘텐츠 관리", icon: BsCollection },
  { key: "setting", name: "설정", icon: BsWrenchAdjustable },
];

export const AdminLayout = () => {
  const [isFullWidth, setIsFullWidth] = useState(false);

  const { data } = useGetAdminMenus();

  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;

    const keys = Object.keys(data);

    if (keys.length === 0) return;

    let firstMenu = "";

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (data[key].length === 0) continue;

      firstMenu += `${data[key][0].url}`;
      break;
    }

    navigate(firstMenu);
  }, [data]);

  const onChange = () => {
    setIsFullWidth(!isFullWidth);
  };

  return (
    <Box minH="100vh" bgColor="gray.0">
      <Show above="md">
        <DesktopAdminLayout menuList={data} onChange={onChange} />
      </Show>
      <Hide above="md">
        <MobileAdminLayout menuList={data} />
      </Hide>
      <Box ml={{ md: "280px" }}>
        <Box
          pt={{ base: "56px", md: "0" }}
          pb="2rem"
          mx="auto"
          h="full"
          textAlign="center"
          transition="all 0.2s"
          maxW={isFullWidth ? "100%" : "container.lg"}
          px={{ base: "1rem" }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

interface AdminLayoutProps {
  menuList: AdminMenuDashBoard | undefined;
}

const MobileAdminLayout = ({ menuList }: AdminLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasAuth } = useUserState();

  const { mutate: logout } = useLogout();
  const { goToLoginPage, goToMyPage } = useNavigatePage();

  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <Flex
        w="100%"
        h="56px"
        bgColor="white"
        borderBottom={`1px solid ${openColors.gray[3]}`}
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        zIndex="1"
      >
        <Button px="8px" bgColor="white" onClick={onOpen}>
          <BsList fontSize="32px" />
        </Button>
        <Link as={RouterLink} to="/admin" _hover={{ textDecoration: "none" }}>
          <Box display="inline-block" textAlign="center" boxSize="3rem">
            <SELogo width="100%" height="100%" fill={semanticColors.primary} />
            <Text mt="-8px" fontSize="sm" color={semanticColors.primary}>
              ADMIN
            </Text>
          </Box>
        </Link>
        <Menu>
          <MenuButton
            aria-label="계정 정보"
            as={IconButton}
            icon={<BsPersonCircle />}
            fontSize="32px"
            mr="4px"
            color="gray.6"
            bgColor="white"
            _hover={{ bgColor: "white" }}
          />
          <MenuList>
            {hasAuth ? (
              <>
                <MenuItem _hover={{ bgColor: "blue.1" }} onClick={goToMyPage}>
                  내 계정 조회
                </MenuItem>
                <MenuItem
                  _hover={{ bgColor: "blue.1" }}
                  onClick={() => logout()}
                >
                  로그아웃
                </MenuItem>
              </>
            ) : (
              <MenuItem _hover={{ bgColor: "blue.1" }} onClick={goToLoginPage}>
                로그인
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Flex>
      <Drawer
        size="full"
        isOpen={!isLargerThanMD ? isOpen : false}
        placement="left"
        onClose={onClose}
      >
        <DrawerContent>
          <SidebarContent menuList={menuList} onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

const DesktopAdminLayout = ({
  menuList,
  onChange,
}: AdminLayoutProps & { onChange: () => void }) => {
  const { hasAuth } = useUserState();
  const { mutate: logout } = useLogout();
  const { goToLoginPage, goToMyPage } = useNavigatePage();
  return (
    <>
      <SidebarContent menuList={menuList} />
      <Flex
        w="100%"
        h="56px"
        bgColor="white"
        borderBottom={`1px solid ${openColors.gray[3]}`}
        justifyContent="flex-end"
        alignItems="center"
      >
        <FormControl
          display="flex"
          alignItems="center"
          w="fit-content"
          mr="16px"
        >
          <FormLabel fontWeight="semibold" htmlFor="full-width" mb="0" mr="4px">
            전체 너비
          </FormLabel>
          <Switch onChange={onChange} id="full-width" />
        </FormControl>
        <Link
          as={RouterLink}
          mr="12px"
          to="/"
          color="blue.5"
          fontSize="2xl"
          fontWeight="semibold"
        >
          SE BOARD
        </Link>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="계정 정보"
            icon={<BsPersonCircle />}
            ml="12px"
            mr="24px"
            fontSize="36px"
            color="gray.6"
            bgColor="white"
            _hover={{ bgColor: "white" }}
          />
          <MenuList>
            {hasAuth ? (
              <>
                <MenuItem _hover={{ bgColor: "blue.1" }} onClick={goToMyPage}>
                  내 계정 조회
                </MenuItem>
                <MenuItem
                  _hover={{ bgColor: "blue.1" }}
                  onClick={() => logout()}
                >
                  로그아웃
                </MenuItem>
              </>
            ) : (
              <MenuItem _hover={{ bgColor: "blue.1" }} onClick={goToLoginPage}>
                로그인
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

const SidebarContent = ({ menuList, onClose }: SidebarProps) => {
  return (
    <Box
      bgColor="white"
      transition={{ in: "3s ease", out: "3s ease" }}
      borderRight={`1px solid ${openColors.gray[3]}`}
      w={{ base: "full", md: "280px" }}
      position="fixed"
      h="full"
      textAlign="center"
    >
      <Box display={{ base: "none", md: "block" }} my="20px">
        <Link as={RouterLink} to="/admin" _hover={{ textDecoration: "none" }}>
          <Box display="inline-block" textAlign="center" boxSize="3.5rem">
            <SELogo width="100%" height="100%" fill={semanticColors.primary} />
            <Text mt="-6px" fontSize="16px" color={semanticColors.primary}>
              ADMIN
            </Text>
          </Box>
        </Link>
      </Box>

      <Flex
        justifyContent="flex-end"
        m="24px"
        display={{ base: "flex", md: "none" }}
      >
        <CloseButton onClick={onClose} />
      </Flex>

      <Center w="full">
        <Accordion w="full" allowMultiple>
          {LinkItems.map((item, idx) =>
            menuList && menuList[item.key].length ? (
              <AccordionItem key={item.key} textAlign="center" px="1rem">
                <AccordionButton>
                  <Box
                    display="flex"
                    alignItems="center"
                    flex="1"
                    textAlign="left"
                  >
                    <Icon fontSize="1.25rem" as={item.icon} mr="8px" />
                    <Text fontSize="1.25rem">{item.name}</Text>
                  </Box>
                  <AccordionIcon color="gray.6" fontSize="1.5rem" />
                </AccordionButton>
                {menuList &&
                  menuList[item.key].map((subItem) => (
                    <Link
                      key={subItem.id}
                      as={RouterLink}
                      to={`${subItem.url}`}
                      w="full"
                      fontSize="1rem"
                      _hover={{ textDecoration: "none" }}
                    >
                      <AccordionPanel
                        py="6px"
                        pl="48px"
                        w="full"
                        transition="0.2s"
                        _hover={{ bgColor: "blue.1" }}
                        textAlign="left"
                      >
                        {subItem.name}
                      </AccordionPanel>
                    </Link>
                  ))}
              </AccordionItem>
            ) : (
              <React.Fragment key={idx}></React.Fragment>
            )
          )}
        </Accordion>
      </Center>

      <Box
        display={{ base: "block", md: "none" }}
        position="absolute"
        bottom="12px"
        left="12px"
        fontSize="20px"
        fontWeight="semibold"
      >
        <Link href="/" color="blue.5">
          SE BOARD 게시판 바로가기
        </Link>
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose?: () => void;
  menuList: AdminMenuDashBoard | undefined;
}
