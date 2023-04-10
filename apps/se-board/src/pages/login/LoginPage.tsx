import { Button, Center, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { ReactComponent as KakaoSymbol } from "@/assets/images/kakao_symbol.svg";
import { Logo } from "@/components";

import { LoginForm } from "./LoginForm";

export const LoginPage = () => (
  <Center w="full" h="100vh" bgColor="gray.0">
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      maxW={{ base: "full", md: "480px" }}
      minH={{ base: "full", md: "max-content" }}
      w="full"
      px={{ base: "1rem", md: "3rem" }}
      py="2rem"
      bgColor="white"
    >
      <Logo size="64px" />
      <Flex w="full" pt="3rem" pb="2rem">
        <LoginForm />
      </Flex>
      <Flex fontSize="sm" gap="0.5rem" alignSelf="flex-end" mb="2rem">
        <Text>계정이 없으신가요?</Text>
        <Link to="/signup">
          <Button
            variant="link"
            fontSize="sm"
            fontWeight="bold"
            color="primary"
          >
            회원가입
          </Button>
        </Link>
      </Flex>
      <Divider />
      <Flex
        direction="column"
        alignItems="center"
        gap="1rem"
        w="full"
        mt="2rem"
      >
        <Text fontSize="sm">SNS계정으로 간편 로그인 / 회원가입</Text>
        <Stack w="full">
          <Button bgColor="#FEE500" _hover={{ bgColor: "#FEE500" }} w="full">
            <KakaoSymbol width="1.5rem" height="1.5rem" />
            <Text color="#000000D9" flexGrow="1">
              카카오 로그인
            </Text>
          </Button>
        </Stack>
      </Flex>
    </Flex>
  </Center>
);
