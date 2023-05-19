import { Box } from "@chakra-ui/react";

import { ListItem } from ".";

interface ListContainerProps {
  data: { id: number; name: string }[];
  deleteOnClick: (id: number) => void;
}

export const ListContainer = ({ data, deleteOnClick }: ListContainerProps) => {
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
        <ListItem item={item} deleteOnClick={deleteOnClick} />
      ))}
    </Box>
  );
};
