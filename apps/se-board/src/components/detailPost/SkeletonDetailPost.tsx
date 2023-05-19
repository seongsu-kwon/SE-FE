import {
  Box,
  Flex,
  HStack,
  Icon,
  Skeleton,
  SkeletonText,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { BsBookmark, BsThreeDotsVertical } from "react-icons/bs";

import { openColors } from "@/styles";

import { BackButton } from "./BackButton";

export const SkeletonDetailPostHeader = () => {
  return (
    <Box>
      <Flex borderBottom={`1px solid ${openColors.gray[3]}`}>
        <BackButton />
        <Spacer />
        <Icon
          aria-label="북마크"
          as={BsBookmark}
          boxSize="24px"
          my="auto"
          cursor="none"
        />
        <Icon
          aria-label="더보기"
          as={BsThreeDotsVertical}
          boxSize="24px"
          my="auto"
          mx="1vw"
          cursor="none"
        />
      </Flex>
      <Box borderBottom={`1px solid ${openColors.gray[3]}`}>
        <Box m="16px 0 16px 16px">
          <Skeleton height="30px" w="300px" />
          <HStack mt="4px" spacing="4px">
            <Skeleton height="20px" w="80px" />
            <Skeleton height="20px" w="80px" />
            <Skeleton height="20px" w="80px" />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export const SkeletonDetailPostDesktopHeader = () => {
  return (
    <Box
      display="flex"
      w="100%"
      m="20px auto 0 auto"
      borderY={`1px solid ${openColors.gray[3]}`}
    >
      <Stack m="16px 0 16px 16px" spacing="3">
        <Skeleton height="40px" w="600px" />
        <HStack spacing="3">
          <Skeleton height="24px" w="130px" />
          <Skeleton height="24px" w="130px" />
          <Skeleton height="24px" w="130px" />
        </HStack>
      </Stack>
    </Box>
  );
};

export const SkeletonDetailPostContent = () => {
  return (
    <Box
      maxW="100%"
      minH="450px"
      mx="auto"
      borderBottom={`1px solid ${openColors.gray[3]}`}
    >
      <Box mx="16px">
        <SkeletonText
          pt="12px"
          noOfLines={{ base: 4, md: 6 }}
          spacing={{ base: "2", md: "4" }}
          skeletonHeight={{ base: "16px", md: "20px" }}
        />
      </Box>
    </Box>
  );
};
