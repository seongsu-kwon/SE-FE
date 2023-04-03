import { Flex, Heading, Hide, Img, Show, Stack } from "@chakra-ui/react";

import NoticeIcon from "@/assets/images/notice_icon.png";

import { NoticeList } from "./NoticeList";
import { NoticeTable } from "./NoticeTable";
export const NoticePage = () => {
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
        <NoticeTable />
      </Show>
      <Hide above="md">
        <NoticeList />
      </Hide>
    </Stack>
  );
};
