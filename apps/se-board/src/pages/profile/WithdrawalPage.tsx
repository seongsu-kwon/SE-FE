import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { withdrawal } from "@/api/auth";
import { useNavigatePage } from "@/hooks";
import { userState } from "@/store/user";

export const WithdrawalPage = () => {
  const [input, setInput] = useState("");
  const [complete, setComplete] = useState(false);
  const userInfo = useRecoilValue(userState);
  const resetUserInfo = useResetRecoilState(userState);

  const onClickWithdrawal = () => {
    withdrawal().then((res) => {
      setComplete(true);
      resetUserInfo();
      localStorage.removeItem("refresh_token");
      sessionStorage.removeItem("refresh_token");
    });
  };

  const bgColor = useColorModeValue("gray.0", "#1A202C");
  const cardBgColor = useColorModeValue("white", "whiteAlpha.50");
  const color = useColorModeValue("gray.7", "whiteAlpha.800");
  const borderColor = useColorModeValue("gray.2", "whiteAlpha.400");

  return (
    <Box
      position="relative"
      zIndex={0}
      w="full"
      minH={{ base: "100vh", md: "calc(100vh - 59px)" }}
      bg={bgColor}
    >
      <Flex
        direction="column"
        alignItems="center"
        maxW={{ base: "full", md: "480px" }}
        minH={{ base: "100vh", md: "100%" }}
        w="full"
        pt={{ base: "56px", md: 0 }}
        marginX="auto"
        bgColor={cardBgColor}
        border={"1px solid"}
        borderColor={borderColor}
        borderRadius={3}
      >
        {complete ? (
          <CompleteWithdrawal />
        ) : (
          <>
            <Heading
              fontSize={{ base: "1.25rem", md: "1.5rem" }}
              color={color}
              py="0.75rem"
            >
              회원탈퇴
            </Heading>
            <Divider />
            <Flex direction="column" w="full" py="1rem" px="1rem">
              <Wrap mb="1rem">
                <Text fontSize="sm" color={color}>
                  회원 탈퇴를 원하시면 아래에 로그인ID를 입력 후 탈퇴하기를
                  눌러주세요
                </Text>
                <Text fontSize="sm" color="red.7">
                  회원 탈퇴 시 작성한 글과 댓글이 모두 삭제됩니다
                </Text>
              </Wrap>

              <Input
                placeholder={userInfo.email}
                color={color}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                mb="1rem"
              />
              <Button
                onClick={onClickWithdrawal}
                isDisabled={userInfo.email !== input}
                variant="danger"
              >
                탈퇴하기
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

const CompleteWithdrawal = () => {
  const { goToMainPage } = useNavigatePage();
  return (
    <Flex w="full" flexGrow={1} justifyContent="center" alignItems="center">
      <Flex direction="column" alignItems="center" gap="2rem">
        <Icon as={BsCheckCircleFill} color="primary" boxSize="5rem" />
        <Heading
          fontSize={{ base: "1rem", md: "1.5rem" }}
          color="gray.8"
          py="0.75rem"
        >
          회원탈퇴 완료
        </Heading>
        <Button onClick={goToMainPage} variant="primary" fontWeight="bold">
          메인페이지로
        </Button>
      </Flex>
    </Flex>
  );
};
