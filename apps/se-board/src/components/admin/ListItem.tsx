import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { BsX } from "react-icons/bs";

interface ListItemProps {
  item: { id: number; name: string };
  deleteOnClick: (id: number) => void;
}

export const ListItem = ({ item, deleteOnClick }: ListItemProps) => {
  return (
    <Flex
      w="full"
      h="32px"
      pl={{ base: "2rem", md: "6rem" }}
      pr={{ base: "2rem", md: "6rem" }}
      borderBottom="1px solid"
      borderColor="gray.5"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize={{ base: "md", md: "lg" }}>{item.name}</Text>
      <Tooltip hasArrow label="삭제" fontSize="sm" placement="top">
        <IconButton
          aria-label="삭제"
          variant="danger"
          icon={<BsX />}
          fontSize="1.5rem"
          size="xs"
          onClick={() => deleteOnClick(item.id)}
        />
      </Tooltip>
    </Flex>
  );
};
