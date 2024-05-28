import { AspectRatio, Center, Text, useColorModeValue } from "@chakra-ui/react";

export const UpdateIcon = () => {
  const bgColor = useColorModeValue("purple.400", "#7562B5");
  const color = useColorModeValue("white", "whiteAlpha.900");

  return (
    <AspectRatio w="16px" ratio={1} display="inline-block" overflow="hidden">
      <Center backgroundColor={bgColor}>
        <Text color={color} fontSize="12px">
          U
        </Text>
      </Center>
    </AspectRatio>
  );
};
