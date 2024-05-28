import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { BsChatLeftText } from "react-icons/bs";

import { openColors } from "@/styles";

export const CommentHeader = ({
  commentTotalSize,
}: {
  commentTotalSize: number;
}) => {
  const borderColor = useColorModeValue("gray.3", "whiteAlpha.400");
  const color = useColorModeValue("gray.7", "whiteAlpha.800");

  return (
    <Box
      my="auto"
      borderBottom={`1px solid`}
      borderColor={borderColor}
      color={color}
    >
      <Flex my={{ base: "12px", md: "16px" }} ml="16px" gap={1}>
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
