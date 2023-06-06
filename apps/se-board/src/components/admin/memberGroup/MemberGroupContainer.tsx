import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import { MemberGroupTable } from "./MemberGroupTable";

export const MemberGroupContainer = () => {
  const [addIsOpen, setAddIsOpen] = useState(false);

  return (
    <Box
      my="20px"
      bgColor="white"
      py="1rem"
      px={{ base: "0.75rem", md: "1rem" }}
      rounded="3xl"
      overflowX="auto"
    >
      <Text
        fontWeight="semibold"
        fontSize={{ base: "xl", md: "2xl" }}
        mb="20px"
        borderBottom="1px solid"
        borderColor="gray.5"
      >
        권한 목록
      </Text>
      <MemberGroupTable addIsOpen={addIsOpen} setAddIsOpen={setAddIsOpen} />
      <Button
        leftIcon={<BsPlusLg />}
        variant="primary"
        mt="1rem"
        fontSize="1rem"
        onClick={() => setAddIsOpen(true)}
      >
        권한 추가
      </Button>
    </Box>
  );
};
