import { Center, Divider, Flex, Heading } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import { useFetchOAuthUserBasicInfo } from "@/react-query/hooks/auth";

import { OAuthSignupForm } from "./OAuthSignupForm";

export const OAuthSignupPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: fetchResult } = useFetchOAuthUserBasicInfo(
    searchParams.get("id")!
  );

  return (
    <Center w="full" minH="100vh" bgColor="gray.0" py={{ md: "3rem" }}>
      <Flex
        direction="column"
        alignItems="center"
        maxW={{ base: "full", md: "480px" }}
        minH={{ base: "100vh", md: "max-content" }}
        w="full"
        bgColor="white"
      >
        <Heading
          fontSize={{ base: "1rem", md: "1.5rem" }}
          color="gray.8"
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
            <OAuthSignupForm info={fetchResult?.data} />
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
};
