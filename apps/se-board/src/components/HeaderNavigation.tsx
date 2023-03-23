import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Flex,
  Hide,
  Icon,
  Link as ExternalLink,
  Show,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BsBoxArrowUpRight, BsList } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as SELogo } from "@/assets/images/se_logo.svg";
import { semanticColors } from "@/styles";

const NAV_ITEMS: readonly NavItemProps[] = [
  { name: "공지", path: "notice" },
  { name: "자유", path: "free-board" },
  { name: "아카이브", path: "archive" },
  { name: "지도교수 상담", path: "consulting" },
  { name: "팀모집", path: "recruitment" },
  { name: "프로젝트실 예약", path: "projectroom-reservation" },
  { name: "서버 대여", path: "server-rental" },
];

const DESKTOP_NAV_ITEMS: readonly NavItemProps[] = [
  ...NAV_ITEMS,
  {
    name: "학사",
    path: "https://cs.kumoh.ac.kr/cs/sub0601.do",
    isExternalSite: true,
  },
  {
    name: "채용",
    path: "https://cs.kumoh.ac.kr/cs/sub0602.do",
    isExternalSite: true,
  },
] as const;

export const DesktopHeaderNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center as="header" shadow="base">
      <Flex
        maxW="container.xl"
        w="full"
        align="center"
        justify="space-between"
        px="1rem"
      >
        <Logo size="3.5rem" />
        <Show above="lg">
          <Box as="nav">
            <Wrap spacingX="2rem" spacingY="0px">
              {DESKTOP_NAV_ITEMS.map((item) => (
                <DesktopNavItem key={item.name} {...item} />
              ))}
            </Wrap>
          </Box>
          <ButtonGroup>
            <Button variant="primary-outline" rounded="full">
              로그인
            </Button>
          </ButtonGroup>
        </Show>
        {/* tablet 사이즈에서 노출 desktop 사이즈에서 노출X */}
        <Hide above="lg">
          <Button onClick={onOpen} variant="ghost" p="0">
            <Icon as={BsList} color="gray.7" boxSize="2rem" />
          </Button>
          <DrawerNavigation isOpen={isOpen} onClose={onClose} />
        </Hide>
      </Flex>
    </Center>
  );
};

const DrawerNavigation = ({
  onClose,
  isOpen,
  ...props
}: Omit<DrawerProps, "children">) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {/* 로그인 했을 때 DrawerHeader 보여주기 */}
        <DrawerHeader borderBottomWidth="1px">
          <Flex alignItems="center" gap="1rem">
            <Avatar />
            <Text>박형준</Text>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Wrap>
            {DESKTOP_NAV_ITEMS.map((item) => (
              <DrawerNavItem {...item} onClick={onClose} />
            ))}
          </Wrap>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="primary" w="full">
            로그인
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const HeaderNavigation = () => {
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        px={{ base: "0.5rem", md: "1rem" }}
        py="0.5rem"
      >
        <Logo size="3rem" />
        <Button variant="primary-outline" rounded="full">
          로그인
        </Button>
      </Flex>
      <Center as="nav" w="full" position="sticky" top="0">
        <Flex
          as="ul"
          gap="1.5rem"
          overflowX="auto"
          flexWrap="nowrap"
          w="full"
          px="0.75rem"
          borderY="1px"
          borderColor="primary"
          bgColor="primary"
        >
          {NAV_ITEMS.map((item, i) => (
            <NavItem key={item.name} {...item} />
          ))}
        </Flex>
      </Center>
    </>
  );
};

interface NavItemProps {
  name: string;
  path: string;
  isExternalSite?: boolean;
  onClick?: () => void;
}

const DesktopNavItem = ({ name, path, isExternalSite }: NavItemProps) => {
  return (
    <WrapItem m="0px" fontSize="1.125rem" fontWeight="bold">
      {isExternalSite ? (
        <ExternalLink
          href={path}
          target="_blank"
          display="flex"
          alignItems="center"
          columnGap="0.25rem"
          isExternal
          _hover={{ textDecoration: "none" }}
        >
          <Text py="1rem">{name}</Text>
          <Icon as={BsBoxArrowUpRight} mb="0.25rem" boxSize="0.875rem" />
        </ExternalLink>
      ) : (
        <NavLink to={path}>
          {({ isActive }) => (
            <Text
              fontWeight="bold"
              color={isActive ? "primary" : "gray.7"}
              position="relative"
              py="1rem"
              _before={
                isActive
                  ? {
                      content: `""`,
                      position: "absolute",
                      display: "block",
                      w: "full",
                      h: "0.25rem",
                      roundedTopLeft: "0.25rem",
                      roundedTopRight: "0.25rem",
                      bgColor: "primary",
                      bottom: 0,
                    }
                  : {}
              }
            >
              {name}
            </Text>
          )}
        </NavLink>
      )}
    </WrapItem>
  );
};

const DrawerNavItem = ({
  name,
  path,
  isExternalSite,
  onClick,
}: NavItemProps) => {
  return (
    <WrapItem
      onClick={onClick}
      w="full"
      m="0px"
      fontSize="1.125rem"
      fontWeight="bold"
    >
      {isExternalSite ? (
        <ExternalLink
          isExternal
          href={path}
          target="_blank"
          w="full"
          _hover={{ textDecoration: "none" }}
        >
          <Box
            display="flex"
            alignItems="center"
            columnGap="0.25rem"
            w="full"
            p="1rem"
            rounded="lg"
            transition="background-color 0.2s"
            _hover={{ bgColor: "gray.0" }}
          >
            <Text>{name}</Text>
            <Icon as={BsBoxArrowUpRight} mb="0.25rem" boxSize="0.875rem" />
          </Box>
        </ExternalLink>
      ) : (
        <NavLink to={path} style={{ width: "100%" }}>
          {({ isActive }) => (
            <Box
              w="full"
              p="1rem"
              bgColor={isActive ? "gray.1" : "transparent"}
              rounded="lg"
              transition="background-color 0.2s"
              _hover={{ bgColor: "gray.0" }}
            >
              <Text fontWeight="bold" color={isActive ? "primary" : "gray.7"}>
                {name}
              </Text>
            </Box>
          )}
        </NavLink>
      )}
    </WrapItem>
  );
};

const NavItem = ({ name, path }: NavItemProps) => {
  return (
    <WrapItem m={0}>
      <NavLink to={path}>
        {({ isActive }) => (
          <Text
            position="relative"
            py="0.75rem"
            whiteSpace="nowrap"
            fontWeight="bold"
            color="primary-content"
            opacity={isActive ? 1 : 0.5}
            _before={
              isActive
                ? {
                    content: `""`,
                    position: "absolute",
                    display: "block",
                    bottom: "1px",
                    w: "full",
                    h: "0.25rem",
                    roundedTopLeft: "0.25rem",
                    roundedTopRight: "0.25rem",
                    bgColor: "primary-content",
                    opacity: 0.6,
                  }
                : {}
            }
          >
            {name}
          </Text>
        )}
      </NavLink>
    </WrapItem>
  );
};

const Logo = ({ size }: { size: string }) => {
  return (
    <Link to="/">
      <Box boxSize={size}>
        <SELogo width="100%" height="100%" fill={semanticColors.primary} />
      </Box>
    </Link>
  );
};
