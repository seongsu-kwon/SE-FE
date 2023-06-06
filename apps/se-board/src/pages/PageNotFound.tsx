import { Button, Flex, Image, Text } from "@chakra-ui/react";

import { useNavigatePage } from "@/hooks";

export const PageNotFound = () => {
  const { goToMainPage } = useNavigatePage();
  return (
    <Flex w="full" justifyContent="center">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        h="calc(100vh - 56px)"
        maxW={{ base: "20rem", sm: "30rem" }}
      >
        <Flex>
          <Image src="/404.png" objectFit="contain" />
        </Flex>
        <Text color="gray.6" fontSize="lg" fontWeight="bold">
          페이지를 찾을 수 없습니다
        </Text>
        <Button onClick={goToMainPage} variant="primary" mt="3rem" w="full">
          메인 페이지로
        </Button>
      </Flex>
    </Flex>
  );
};
