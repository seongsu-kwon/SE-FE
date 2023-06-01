import { Box, Flex, Text } from "@chakra-ui/react";
import { BannedId, BannedNickname, IpInfo } from "@types";

import { ListItem } from ".";

interface ListContainerProps {
  data: BannedNickname[] | BannedId[] | IpInfo[];
  deleteOnClick: (name: string) => void;
  isLoading: boolean;
}

export const ListContainer = ({
  data,
  deleteOnClick,
  isLoading,
}: ListContainerProps) => {
  return (
    <Box
      w="full"
      h="160px"
      border="1px solid"
      borderColor="gray.5"
      overflow="auto"
      bgColor="white"
      rounded={{ base: "sm", md: "lg" }}
    >
      {data.map((item) => (
        <ListItem
          item={item}
          deleteOnClick={deleteOnClick}
          isLoading={isLoading}
        />
      ))}
      {data.length === 0 && (
        <Flex w="full" h="full" justifyContent="center" alignItems="center">
          <Text color="gray.5" fontSize="lg">
            데이터가 없습니다.
          </Text>
        </Flex>
      )}
    </Box>
  );
};
