import { Box, Button, Text } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

import { openColors } from "@/styles";

interface ShowMoreButtonProps {
  onClick: () => void;
  isFetchingNextPage: boolean;
}

export const ShowMoreCommentButton = ({
  onClick,
  isFetchingNextPage,
}: ShowMoreButtonProps) => {
  return (
    <Box borderTop={`1px solid ${openColors.gray[3]}`} position="relative">
      <Button
        w="100%"
        h="48px"
        bgColor={openColors.white}
        borderRadius="0"
        color={openColors.gray[6]}
        _hover={{ bgColor: openColors.white, color: openColors.blue[5] }}
        isLoading={isFetchingNextPage}
        loadingText="조회 중..."
        onClick={onClick}
      >
        <BsChevronDown /> <Text ml="4px">댓글 더보기</Text>
      </Button>
    </Box>
  );
};
