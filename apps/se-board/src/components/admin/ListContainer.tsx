import { Box } from "@chakra-ui/react";
import { BannedId, BannedNickname } from "@types";

import { ListItem } from ".";

interface ListContainerProps {
  data: BannedNickname[] | BannedId[] | { id: number; name: string }[];
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
    </Box>
  );
};
