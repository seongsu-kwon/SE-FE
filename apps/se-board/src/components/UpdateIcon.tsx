import { AspectRatio, Center, Text } from "@chakra-ui/react";

export const UpdateIcon = () => {
  return (
    <AspectRatio w="16px" ratio={1} display="inline-block" overflow="hidden">
      <Center backgroundColor="purple.400">
        <Text color="white" fontSize="12px">
          U
        </Text>
      </Center>
    </AspectRatio>
  );
};
