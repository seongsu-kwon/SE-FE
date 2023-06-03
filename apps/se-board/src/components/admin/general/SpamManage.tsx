import { Box, Divider, Text } from "@chakra-ui/react";

import { SpamIP } from "./SpamIP";
import { SpamKeyword } from "./SpamKeyword";

export const SpamManage = () => {
  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
    >
      <Text
        fontWeight="semibold"
        fontSize={{ base: "xl", md: "2xl" }}
        mb="20px"
        borderBottom="1px solid"
        borderColor="gray.5"
      >
        스팸 관리
      </Text>
      <SpamKeyword />
      <Divider border="1px" borderColor="gray.6" />
      <SpamIP />
    </Box>
  );
};
