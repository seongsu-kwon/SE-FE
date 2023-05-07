import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { BsChatLeftText } from "react-icons/bs";

import { openColors } from "@/styles";

export const CommentHeader = ({
  commentTotalSize,
}: {
  commentTotalSize: number;
}) => {
  return (
    <Box my="auto" borderBottom={`1px solid ${openColors.gray[3]}`}>
      <Flex my={{ base: "12px", md: "16px" }} ml="16px">
        <Icon as={BsChatLeftText} boxSize="16px" my="auto" />
        <Text ml="6px" fontSize="md">
          댓글
        </Text>
        <Text ml="2px" fontSize="md" color={openColors.orange[7]}>
          {commentTotalSize}
        </Text>
      </Flex>
    </Box>
  );
};
