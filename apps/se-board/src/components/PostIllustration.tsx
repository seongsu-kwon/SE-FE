import { Flex, Heading, Img } from "@chakra-ui/react";

interface PostIllustrationProps {
  title: string;
  imgSrc: string;
}

export const PostIllustration = ({ title, imgSrc }: PostIllustrationProps) => {
  return (
    <Flex
      position="relative"
      alignItems="center"
      maxW="container.sm"
      w="full"
      px="2rem"
      py="1.2rem"
      mx="auto"
      mb="2rem"
      bgColor="gray.1"
      borderRadius="0.5rem"
    >
      <Heading fontSize="2rem">{title}</Heading>
      <Img
        src={imgSrc}
        position="absolute"
        w="6rem"
        right="2rem"
        top="-1.5rem"
      />
    </Flex>
  );
};
