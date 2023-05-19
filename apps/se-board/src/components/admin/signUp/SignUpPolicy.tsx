import { Box, Divider, Text } from "@chakra-ui/react";

import { BannedIDManage, BannedNickNameManage } from "./Index";

export const SignUpPolicy = () => {
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
        회원가입
      </Text>
      <BannedNickNameManage />
      <Divider border="1px" borderColor="gray.6" />
      <BannedIDManage />
    </Box>
  );
};
