import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { MainPageMenu } from "@types";
import { useCallback, useMemo } from "react";
import { BsCaretUpFill, BsList, BsPlus } from "react-icons/bs";

import { isCheckedMenuCount } from "@/utils/menuUtils";

import { Logo } from "../Logo";

const menuExample = ["공지사항", "자유게시판", "학사", "채용", "팀 매칭"];

interface Props {
  menuList: (MainPageMenu & { isChecked: boolean })[];
}

const DesktopLayout = ({ menuList }: Props) => {
  const menuListCount = useMemo(() => isCheckedMenuCount(menuList), [menuList]);

  const postTable = useCallback(() => {
    const postTable = [];

    for (let i = 0; i < 5; i++) {
      postTable.push(
        <Box
          display="flex"
          w="full"
          h="1.75rem"
          borderY="1px solid"
          borderColor="gray.3"
          fontSize="xs"
          alignItems="center"
          justifyContent="space-around"
        >
          예시 게시글입니다.
          <Box w="1.25rem" h="1.25rem" bgColor="gray.4" fontSize="4px">
            댓글
          </Box>
        </Box>
      );
    }

    return postTable;
  }, []);

  return (
    <>
      <Box
        w="full"
        minH="20rem"
        maxH="20rem"
        overflowY="auto"
        border="1px solid"
        borderColor="gray.3"
      >
        <Flex
          borderBottom="1px solid"
          borderColor="gray.3"
          h="2.5rem"
          justifyContent="space-around"
          alignItems="center"
        >
          <Logo size="2rem" />
          <Flex justifyContent="space-between">
            {menuExample.map((menu) => (
              <Text px="0.5rem">{menu}</Text>
            ))}
          </Flex>
          <Box
            w="2.75rem"
            h="1.5rem"
            border="1px solid"
            borderColor="blue.5"
            rounded="full"
            color="blue.5"
            fontSize="6px"
            fontWeight="bold"
            textAlign="center"
            py="0.25rem"
          >
            로그인
          </Box>
        </Flex>

        <Box mx="auto" w="65%" py="0.75rem">
          <Flex
            w="100%"
            h="7.5rem"
            bgColor="blue.2"
            color="white"
            justifyContent="center"
            alignItems="center"
            fontSize="2xl"
          >
            배너
          </Flex>

          <Grid
            templateColumns={
              menuListCount === 1 ? "repeat(1, 1fr)" : "repeat(2, 1fr)"
            }
            gap="1rem"
            pt="1rem"
          >
            {menuList.map(
              (v) =>
                v.isChecked && (
                  <GridItem w="full">
                    <Flex
                      w="full"
                      h="2rem"
                      px="1.5rem"
                      justifyContent="space-between"
                      alignItems="center"
                      bgColor="gray.3"
                      rounded="md"
                      fontWeight="bold"
                    >
                      {v.name}
                      <BsPlus fontSize="1.5rem" />
                    </Flex>

                    {postTable()}
                  </GridItem>
                )
            )}
          </Grid>
        </Box>
      </Box>
      <Flex alignItems="center">
        <BsCaretUpFill />
        데스트톱 SE 메인페이지 예상 UI
      </Flex>
    </>
  );
};

export const MobileLayout = ({ menuList }: Props) => {
  const menuListCount = useMemo(() => isCheckedMenuCount(menuList), [menuList]);

  const postTable = useCallback(() => {
    const postTable = [];

    for (let i = 0; i < 5; i++) {
      postTable.push(
        <Box
          display="flex"
          w="full"
          h="1.75rem"
          borderY="1px solid"
          borderColor="gray.3"
          fontSize="xs"
          alignItems="center"
          justifyContent="space-around"
        >
          예시 게시글입니다.
          <Box w="1.25rem" h="1.25rem" bgColor="gray.4" fontSize="4px">
            댓글
          </Box>
        </Box>
      );
    }

    return postTable;
  }, []);

  return (
    <>
      <Box
        w="35%"
        mx="auto"
        mt="1rem"
        maxH="30rem"
        overflowY="auto"
        border="1px solid"
        borderColor="gray.3"
      >
        <Flex
          borderBottom="1px solid"
          borderColor="gray.3"
          h="2.5rem"
          px="2rem"
          justifyContent="space-between"
          alignItems="center"
        >
          <Logo size="2.5rem" />
          <BsList fontSize="1.75rem" />
        </Flex>

        <Box w="full" py="0.75rem">
          <Flex
            w="100%"
            h="6.5rem"
            bgColor="blue.2"
            color="white"
            justifyContent="center"
            alignItems="center"
            fontSize="2xl"
          >
            배너
          </Flex>

          <Box px="1rem">
            {menuList.map(
              (v) =>
                v.isChecked && (
                  <Box w="full" my="1rem">
                    <Flex
                      w="full"
                      h="2rem"
                      px="1.5rem"
                      justifyContent="space-between"
                      alignItems="center"
                      bgColor="gray.3"
                      rounded="md"
                      fontWeight="bold"
                    >
                      {v.name}
                      <BsPlus fontSize="1.5rem" />
                    </Flex>
                    {postTable()}
                  </Box>
                )
            )}
          </Box>
        </Box>
      </Box>

      <Flex alignItems="center" mx="auto" w="fit-content">
        <BsCaretUpFill />
        모바일 SE 메인페이지 예상 UI
      </Flex>
    </>
  );
};

export const LayoutExample = ({ menuList }: Props) => {
  return (
    <Box my="1rem" w="full">
      <DesktopLayout menuList={menuList} />
      <MobileLayout menuList={menuList} />
    </Box>
  );
};
