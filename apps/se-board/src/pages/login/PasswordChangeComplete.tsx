import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { BsCheckCircleFill } from "react-icons/bs";

import { useNavigatePage } from "@/hooks";

export const PasswordChangeComplete = () => {
  const { goToLoginPage } = useNavigatePage();
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      maxW={{ base: "full", md: "480px" }}
      minH={{ base: "100vh", md: "600px" }}
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
        비밀번호 변경 완료
      </Heading>

      <Button onClick={goToLoginPage} variant="primary">
        로그인 페이지로
      </Button>
    </Flex>
  );
};
