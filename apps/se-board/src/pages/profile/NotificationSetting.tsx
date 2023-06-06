import { Box, Divider, Flex, Heading, Switch, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useDebouncedCallback } from "use-debounce";

import { useSignup } from "@/react-query/hooks/auth";
import { user, userState } from "@/store/user";

export const NotificationSettingPage = () => {
  const [nicknameValid, setNicknameValid] = useState(false);
  const userInfo = useRecoilValue(userState);
  const {
    register,
    getFieldState,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<{ nickname: string }>({ mode: "onChange" });

  const { checkDuplicatedNicnameMutation } = useSignup();

  const checkDuplicatedNickname = () => {
    if (getValues("nickname") === user.getNickname()) return;
    checkDuplicatedNicnameMutation
      .mutateAsync(getValues("nickname"))
      .then((res) => {
        if (res.data.duplication) {
          setNicknameValid(false);
          setError("nickname", { message: "중복된 닉네임입니다" });
        } else {
          setNicknameValid(true);
        }
      });
  };

  const onChangeNickname = useDebouncedCallback(checkDuplicatedNickname, 300);

  useEffect(() => {
    setValue("nickname", userInfo.nickname);
  }, [userInfo.nickname]);

  return (
    <Box
      position="relative"
      zIndex={0}
      w="full"
      minH={{ base: "100vh", md: "calc(100vh - 59px)" }}
      bg="gray.0"
    >
      <Flex
        direction="column"
        alignItems="center"
        maxW={{ base: "full", md: "480px" }}
        minH={{ base: "100vh", md: "100%" }}
        w="full"
        pt={{ base: "56px", md: 0 }}
        marginX="auto"
        bgColor="white"
      >
        <Heading
          fontSize={{ base: "1.25rem", md: "1.5rem" }}
          color="gray.8"
          py="0.75rem"
        >
          알림설정
        </Heading>
        <Divider />
        <Flex direction="column" w="full">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="full"
            py="1rem"
            px="2rem"
            color="gray.7"
          >
            <Text fontSize={{ base: "1rem", sm: "1.25rem" }} fontWeight="bold">
              알림받기
            </Text>
            <Switch size="lg" />
          </Flex>
          <Divider />
        </Flex>
      </Flex>
    </Box>
  );
};
