import { AspectRatio, Center, Text } from "@chakra-ui/react";

export const NewIcon = () => {
  return (
    <AspectRatio w="16px" ratio={1} display="inline-block" overflow="hidden">
      <Center backgroundColor="orange.400">
        <Text color="white" fontSize="12px">
          N
        </Text>
      </Center>
    </AspectRatio>
  );
};
