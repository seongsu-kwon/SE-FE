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
import { useState } from "react";
import { IconType } from "react-icons";
import {
  BsCollection,
  BsFolder,
  BsList,
  BsPersonCircle,
  BsPersonLinesFill,
  BsWrenchAdjustable,
} from "react-icons/bs";
import { Outlet } from "react-router-dom";

import { ReactComponent as SELogo } from "@/assets/images/se_logo.svg";
import { user } from "@/store/user";
import { openColors, semanticColors } from "@/styles";

interface LinkItemProps {
  key: string;
  name: string;
  icon?: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { key: "menu", name: "메뉴 관리", icon: BsFolder },
  { key: "person", name: "회원 관리", icon: BsPersonLinesFill },
  { key: "content", name: "컨텐츠 관리", icon: BsCollection },
  { key: "setting", name: "설정", icon: BsWrenchAdjustable },
];

interface SubCategoryItemsProps {
  [key: string]: { name: string; url: string }[];
}

const subCategoryItems: SubCategoryItemsProps[] = [
  {
    menu: [
      { name: "SE 메뉴 편집", url: "/admin/seMenu" },
      { name: "관리자 메뉴 편집", url: "/admin/adminMenu" },
    ],
  },
  {
    person: [
      { name: "회원 목록", url: "/admin/memberList" },
      { name: "회원 정책", url: "/admin/memberPolicy" },
      { name: "회원 그룹", url: "/admin/memberGroup" },
    ],
  },
  {
    content: [
      { name: "게시글 관리", url: "/admin/postManage" },
      { name: "댓글 관리", url: "/admin/commentManage" },
      { name: "첨부파일 관리", url: "/admin/attachmentManage" },
      { name: "휴지통", url: "/admin/trash" },
    ],
  },
  {
    setting: [
      { name: "일반", url: "/admin/general" },
      { name: "메인 페이지 설정", url: "/admin/mainPageSetting" },
    ],
  },
];

export const AdminLayout = () => {
  const [isFullWidth, setIsFullWidth] = useState(false);

  const onChange = () => {
    setIsFullWidth(!isFullWidth);
  };

  return (
    <Box minH="100vh" bgColor="gray.1">
      <Show above="md">
        <DesktopAdminLayout onChange={onChange} />
      </Show>
      <Hide above="md">
        <MobileAdminLayout />
      </Hide>
      <Box
        ml={{ md: "280px" }}
        pt={{ base: "56px", md: "0" }}
        pb="2rem"
        h="full"
        textAlign="center"
        px={{ base: "16px", md: isFullWidth ? "12px" : "120px" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

const MobileAdminLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <Link href="/admin" _hover={{ textDecoration: "none" }}>
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
            <MenuItem _hover={{ bgColor: "blue.1" }}>내 계정 조회</MenuItem>
            {user.hasAuth() && (
              <MenuItem _hover={{ bgColor: "blue.1" }}>로그아웃</MenuItem>
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

const DesktopAdminLayout = ({ onChange }: { onChange: () => void }) => {
  return (
    <>
      <SidebarContent />
      <Flex
        w="100%"
        h="56px"
        bgColor="white"
        borderBottom={`1px solid ${openColors.gray[3]}`}
        justifyContent="flex-end"
        alignItems="center"
        shadow="md"
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
          mr="12px"
          href="/"
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
            <MenuItem _hover={{ bgColor: "blue.1" }}>내 계정 조회</MenuItem>
            {user.hasAuth() && (
              <MenuItem _hover={{ bgColor: "blue.1" }}>로그아웃</MenuItem>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

const SidebarContent = ({ onClose }: SidebarProps) => {
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
        <Link href="/admin" _hover={{ textDecoration: "none" }}>
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
          {LinkItems.map((item) => (
            <AccordionItem textAlign="center" px="1rem">
              <AccordionButton>
                <Box
                  display="flex"
                  alignItems="center"
                  flex="1"
                  textAlign="left"
                >
                  <Icon fontSize="1.25rem`" as={item.icon} mr="8px" />
                  <Text fontSize="1.25rem">{item.name}</Text>
                </Box>
                <AccordionIcon color="gray.6" fontSize="1.5rem" />
              </AccordionButton>
              {subCategoryItems.map((subCategoryItem) =>
                subCategoryItem[item.key]?.map((subItem) => (
                  <Link
                    href={`${subItem.url}`}
                    w="full"
                    fontSize="1rem"
                    _hover={{ textDecoration: "none" }}
                  >
                    <AccordionPanel
                      py="8px"
                      pl="48px"
                      w="full"
                      transition="0.2s"
                      _hover={{ bgColor: "blue.1" }}
                      textAlign="left"
                    >
                      {subItem.name}
                    </AccordionPanel>
                  </Link>
                ))
              )}
            </AccordionItem>
          ))}
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
}
