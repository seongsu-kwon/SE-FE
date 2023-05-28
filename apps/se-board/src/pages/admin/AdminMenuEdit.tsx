import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import { PageHeaderTitle } from "@/components/admin";
import { AuthorityMenu } from "@/components/admin/menuSettings";

export const AdminMenuEdit = () => {
  return (
    <Box h="full" textAlign="left">
      <PageHeaderTitle title="관리자 메뉴 관리" />
      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Heading fontSize="xl">메뉴 관리 권한 설정</Heading>
        <Box ml="2rem">
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w={{ base: "7rem", md: "8rem" }}>
              SE 메뉴 편집
            </Heading>
            <AuthorityMenu />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w={{ base: "7rem", md: "8rem" }}>
              관리자 메뉴 편집
            </Heading>
            <AuthorityMenu />
          </Flex>
        </Box>
      </Box>

      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Heading fontSize="xl">회원 관리 권한 설정</Heading>
        <Box ml="2rem">
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px">
              회원 목록
            </Heading>
            <AuthorityMenu />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px">
              회원 정책
            </Heading>
            <AuthorityMenu />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px">
              회원 그룹
            </Heading>
            <AuthorityMenu />
          </Flex>
        </Box>
      </Box>

      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Heading fontSize="xl">컨텐츠 관리 권한 설정</Heading>
        <Box ml="2rem">
          <Flex alignItems="center" my="0.5rem">
            <Heading
              fontSize="md"
              mr="4px"
              w={{ base: "5.75rem", md: "6.5rem" }}
            >
              게시글 목록
            </Heading>
            <AuthorityMenu />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading
              fontSize="md"
              mr="4px"
              w={{ base: "5.75rem", md: "6.5rem" }}
            >
              댓글 목록
            </Heading>
            <AuthorityMenu />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading
              fontSize="md"
              mr="4px"
              w={{ base: "5.75rem", md: "6.5rem" }}
            >
              첨부파일 목록
            </Heading>
            <AuthorityMenu />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading
              fontSize="md"
              mr="4px"
              w={{ base: "5.75rem", md: "6.5rem" }}
            >
              휴지통 목록
            </Heading>
            <AuthorityMenu />
          </Flex>
        </Box>
      </Box>

      <Box
        my="20px"
        bgColor="white"
        py="1rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="3xl"
      >
        <Heading fontSize="xl">설정 권한 설정</Heading>
        <Box ml="2rem">
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w={{ base: "6.75rem", md: "8rem" }}>
              일반
            </Heading>
            <AuthorityMenu />
          </Flex>
          <Flex alignItems="center" my="0.5rem">
            <Heading fontSize="md" mr="4px" w={{ base: "6.75rem", md: "8rem" }}>
              메인 페이지 설정
            </Heading>
            <AuthorityMenu />
          </Flex>
        </Box>
      </Box>

      <Box
        mt="-10px"
        bgColor="white"
        py="0.5rem"
        px={{ base: "0.75rem", md: "1rem" }}
        rounded="xl"
        textAlign="right"
      >
        <Button variant="primary">등록</Button>
      </Box>
    </Box>
  );
};
