import {
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsCheckCircleFill } from "react-icons/bs";

import { useNavigatePage } from "@/hooks";

export const SignupCompletePage = () => {
  const { goToLoginPage } = useNavigatePage();

  const bgColor = useColorModeValue("gray.0", "#1A202C");
  const cardBgColor = useColorModeValue("white", "whiteAlpha.50");
  const color = useColorModeValue("gray.7", "whiteAlpha.800");

  return (
    <Center w="full" minH="100vh" bgColor={bgColor} py={{ md: "3rem" }}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        maxW={{ base: "full", md: "480px" }}
        minH={{ base: "100vh", md: "600px" }}
        w="full"
        py="2rem"
        bgColor={cardBgColor}
        borderRadius={3}
      >
        <Icon as={BsCheckCircleFill} color="primary" boxSize="5rem" />
        <Heading
          fontSize={{ base: "1rem", md: "1.5rem" }}
          color={color}
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
