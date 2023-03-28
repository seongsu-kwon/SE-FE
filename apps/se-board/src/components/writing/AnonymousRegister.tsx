import { Box, Button, Input } from "@chakra-ui/react";
import { BsFillPencilFill } from "react-icons/bs";

import { openColors } from "@/styles";

export const DesktopAnonymousRegister = () => {
  return (
    <Box
      h="75px"
      maxW="984px"
      m="0 auto 50px auto"
      borderBottom="0.6px solid"
      borderColor={openColors.gray[3]}
      display="flex"
      justifyContent="flex-end"
    >
      <Input
        placeholder="글쓴이"
        size="sm"
        w="160px"
        m="35px 5px 0 0"
        _hover={{ borderColor: openColors.blue[5] }}
        focusBorderColor={openColors.blue[7]}
      />
      <Input
        placeholder="비밀번호"
        size="sm"
        w="160px"
        m="35px 10px 0 5px"
        _hover={{ borderColor: openColors.blue[5] }}
        focusBorderColor={openColors.blue[7]}
      />
      <Button
        variant="primary"
        leftIcon={<BsFillPencilFill />}
        size="sm"
        w="70px"
        m="35px 10px 0 0"
        borderRadius="3px"
      >
        등록
      </Button>
    </Box>
  );
};

export const MobileAnonymousRegister = () => {
  return (
    <Box
      h="60px"
      mb="50px"
      borderBottom="0.6px solid"
      borderColor={openColors.gray[3]}
      display="flex"
      justifyContent="flex-end"
    >
      <Input
        placeholder="글쓴이"
        size="sm"
        w="9rem"
        my="auto"
        mr="5px"
        _hover={{ borderColor: openColors.blue[5] }}
        focusBorderColor={openColors.blue[7]}
      />
      <Input
        placeholder="비밀번호"
        size="sm"
        w="9rem"
        my="auto"
        ml="5px"
        mr="10px"
        _hover={{ borderColor: openColors.blue[5] }}
        focusBorderColor={openColors.blue[7]}
      />
    </Box>
  );
};
