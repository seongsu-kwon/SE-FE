import { AspectRatio, Center, Text, useColorModeValue } from "@chakra-ui/react";

export const NewIcon = () => {
  const bgColor = useColorModeValue("orange.400", "#C77D35");
  const color = useColorModeValue("white", "whiteAlpha.900");

  return (
    <AspectRatio w="16px" ratio={1} display="inline-block" overflow="hidden">
      <Center backgroundColor={bgColor}>
        <Text color={color} fontSize="12px">
          N
        </Text>
      </Center>
    </AspectRatio>
  );
};
