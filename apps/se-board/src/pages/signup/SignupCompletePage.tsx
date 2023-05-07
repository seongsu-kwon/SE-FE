import { Button, Center, Flex, Heading, Icon } from "@chakra-ui/react";
import { BsCheckCircleFill } from "react-icons/bs";

import { useNavigatePage } from "@/hooks";

export const SignupCompletePage = () => {
  const { goToLoginPage } = useNavigatePage();
  return (
    <Center w="full" minH="100vh" bgColor="gray.0" py={{ md: "3rem" }}>
      <Flex
        direction="column"
        alignItems="center"
        maxW={{ base: "full", md: "480px" }}
        minH={{ base: "100vh", md: "max-content" }}
        w="full"
        py="2rem"
        bgColor="white"
      >
        <Icon as={BsCheckCircleFill} color="primary" boxSize="5rem" />
        <Heading
          fontSize={{ base: "1rem", md: "1.5rem" }}
          color="gray.8"
          py="0.75rem"
        >
          회원가입 완료
        </Heading>

        <Button onClick={goToLoginPage} variant="primary">
          로그인 페이지로
        </Button>
      </Flex>
    </Center>
  );
};
