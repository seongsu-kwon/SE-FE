import {
  Button,
  Flex,
  Heading,
  Hide,
  Icon,
  Img,
  Show,
  Stack,
} from "@chakra-ui/react";
import { BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import NoticeIcon from "@/assets/images/notice_icon.png";

import { CategoryNavigation } from "./CategoryNavigation";
import { NoticeList } from "./NoticeList";
import { NoticeTable } from "./NoticeTable";
import { PostSearchForm } from "./PostSearchForm";

export const NoticePage = () => {
  const navigate = useNavigate();
  const goWritePage = () => {
    navigate("write");
  };

  return (
    <Stack alignItems="center" maxW="1180px" w="full" px="1rem" py="3rem">
      <Show above="md">
        <Flex
          position="relative"
          alignItems="center"
          maxW="container.sm"
          w="full"
          px="2rem"
          py="1.2rem"
          mb="2rem"
          bgColor="gray.1"
          borderRadius="0.5rem"
        >
          <Heading fontSize="2rem">공지사항</Heading>
          <Img
            src={NoticeIcon}
            position="absolute"
            w="6rem"
            right="2rem"
            top="-1.5rem"
          />
        </Flex>
        <Flex justifyContent="flex-end" w="full">
          <PostSearchForm />
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          w="full"
          py="0.5rem"
          borderY="1px"
          borderColor="gray.3"
        >
          <CategoryNavigation />
          <Button
            onClick={goWritePage}
            variant="primary"
            leftIcon={<Icon as={BsPencilFill} />}
          >
            글쓰기
          </Button>
        </Flex>
        <NoticeTable />
      </Show>
      <Hide above="md">
        <NoticeList />
      </Hide>
    </Stack>
  );
};
