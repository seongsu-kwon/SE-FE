import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";

import { semanticColors } from "@/styles";

export const MenuDelete = () => {
  return (
    <>
      <Heading fontSize="xl" color={semanticColors.error}>
        메뉴 삭제
      </Heading>
      <Box my="1rem">
        <Text>게시글 이동 후 삭제 가능합니다.</Text>
        <Flex alignItems="center" my="0.5rem">
          <Heading fontSize="md" wordBreak="keep-all" textAlign="center">
            게시글 이동
          </Heading>
          <Select
            w="16rem"
            mx={{ base: "8px", md: "16px" }}
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="" hidden>
              게시판
            </option>
            <option value="notice">공지사항</option>
            <option value="free">자유게시판</option>
          </Select>
          <Button variant="primary">이동</Button>
        </Flex>
      </Box>

      <Divider borderColor="gray.6" my="0.5rem" />

      <Box>
        <Heading fontSize="md" color={semanticColors.error}>
          게시판 삭제
        </Heading>
        <Flex my="0.25rem" alignItems="center">
          <Text>게시판 삭제 후 복구 불가능합니다.</Text>
          <Button variant="danger" ml="1rem">
            삭제
          </Button>
        </Flex>
      </Box>
    </>
  );
};
