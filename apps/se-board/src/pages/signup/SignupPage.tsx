import {
  Center,
  Divider,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { ReactComponent as KakaotalkIcon } from "@/assets/images/kakaotalk_icon.svg";

import { SignupForm } from "./SignupForm";

export const SignupPage = () => {
  const bgColor = useColorModeValue("gray.0", "#1A202C");
  const cardBgColor = useColorModeValue("white", "whiteAlpha.50");
  const color = useColorModeValue("gray.7", "whiteAlpha.800");

  return (
    <Center
      w="full"
      minH="100vh"
      bgColor={bgColor}
      py={{ md: "3rem" }}
      color={color}
    >
      <Flex
        direction="column"
        alignItems="center"
        maxW={{ base: "full", md: "480px" }}
        minH={{ base: "100vh", md: "max-content" }}
        w="full"
        bgColor={cardBgColor}
        borderRadius={3}
      >
        <Heading
          fontSize={{ base: "1rem", md: "1.5rem" }}
          color={color}
          py="0.75rem"
        >
          회원가입
        </Heading>
        <Divider />
        <Flex
          direction="column"
          w="full"
          px={{ base: "1rem" }}
          py={{ base: "1rem", md: "2rem" }}
        >
          <Flex direction="column" alignItems="center" gap="1rem" w="full">
            <Text fontSize="sm">SNS계정으로 로그인 / 회원가입</Text>
            <ChakraLink
              href={`${process.env.REACT_APP_API_ENDPOINT}/oauth2/authorization/kakao`}
              _hover={{ textDecoration: "none" }}
            >
              <Flex w="full" justifyContent="center">
                <KakaotalkIcon width="2.5rem" height="2.5rem" />
              </Flex>
            </ChakraLink>
            <Divider />
            <SignupForm />
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
};
