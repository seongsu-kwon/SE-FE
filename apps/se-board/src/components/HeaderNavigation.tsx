import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Icon,
  Link as ExternalLink,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

import { ReactComponent as SELogo } from "@/assets/images/se_logo.svg";
import { semanticColors } from "@/styles";

const DESKTOP_NAV_ITEMS: readonly NavProps[] = [
  { name: "공지", path: "notice" },
  { name: "자유", path: "free-board" },
  { name: "아카이브", path: "archive" },
  { name: "지도교수 상담", path: "consulting" },
  { name: "팀모집", path: "recruitment" },
  { name: "프로젝트실 예약", path: "projectroom-reservation" },
  { name: "서버 대여", path: "server-rental" },
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
  return (
    <Center as="header" shadow="base">
      <Flex
        maxW="container.xl"
        w="full"
        align="center"
        justify="space-between"
        px="16px"
      >
        <Logo size="56px" />
        <Box as="nav">
          <Wrap spacingX="32px" spacingY="0px">
            {DESKTOP_NAV_ITEMS.map((item) => (
              <DesktopNav key={item.name} {...item} />
            ))}
          </Wrap>
        </Box>
        <ButtonGroup>
          <Button variant="primary-outline" rounded="full">
            로그인
          </Button>
        </ButtonGroup>
      </Flex>
    </Center>
  );
};

interface NavProps {
  name: string;
  path: string;
  isExternalSite?: boolean;
}

const DesktopNav = ({ name, path, isExternalSite }: NavProps) => {
  return (
    <WrapItem m={0} fontSize="18px" fontWeight="bold">
      {isExternalSite ? (
        <ExternalLink
          href={path}
          target="_blank"
          display="flex"
          alignItems="center"
          columnGap={1}
          isExternal
          _hover={{ textDecoration: "none" }}
        >
          <Text py={4}>{name}</Text>
          <Icon as={BsBoxArrowUpRight} mb="1" boxSize="14px" />
        </ExternalLink>
      ) : (
        <NavLink to={path}>
          {({ isActive }) => (
            <Text
              fontWeight="bold"
              color={isActive ? "primary" : "gray.7"}
              position="relative"
              py={4}
              _before={
                isActive
                  ? {
                      content: `""`,
                      position: "absolute",
                      display: "block",
                      w: "full",
                      h: "4px",
                      roundedTopLeft: "4px",
                      roundedTopRight: "4px",
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

const Logo = ({ size }: { size: string }) => {
  return (
    <Link to="/">
      <Box boxSize={size}>
        <SELogo width="full" height="full" fill={semanticColors.primary} />
      </Box>
    </Link>
  );
};
