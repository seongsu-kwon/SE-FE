import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCheck } from "react-icons/bs";

import { useCoundDown } from "@/hooks/useCountDown";
import { useChangePasswordWithoutLogin } from "@/react-query/hooks/useChangePasswordWithoutLoginQuery";
import { secondsToMMSS } from "@/utils/dateUtil";

import { PasswordChangeComplete } from "./PasswordChangeComplete";

/*
 로그인하지 않은 상태로 비밀번호를 찾는 페이지
 */

interface PasswordChangeFormFields {
  email: string;
  authCode: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
}

export const PasswordChangeWithoutLoginPage = () => {
  const [isChangePasswordComplete, setIsChangePasswordComplete] =
    useState(false);
  const [checkAuthCodeBoxOpen, setCheckAuthCodeBoxOpen] = useBoolean(false);
  const {
    register,
    getFieldState,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<PasswordChangeFormFields>({ mode: "onBlur" });

  const { count, startCountDown, stopCountDown, resetCountDown } =
    useCoundDown(180);

  const {
    emailAuthCodeMutation,
    checkAuthCodeMutation,
    changePasswordMutation,
  } = useChangePasswordWithoutLogin();

  const onSubmit: SubmitHandler<PasswordChangeFormFields> = (data) =>
    changePasswordMutation
      .mutateAsync({
        email: data.email,
        password: data.password,
      })
      .then((res) => setIsChangePasswordComplete(true));

  const sendEmailAuthCode = () => {
    emailAuthCodeMutation
      .mutateAsync(getValues("email"))
      .then(() => {
        setCheckAuthCodeBoxOpen.on();
        resetCountDown();
        startCountDown();
        clearErrors("authCode");
      })
      .catch((err) => {
        if (err.code === 110) {
          setError("email", { message: "이미 사용중인 메일입니다" });
        } else if (err.code === 111)
          setError("email", { message: "잘못된 이메일 형식입니다" });
      });
  };

  const resendEmailAuthCode = () => {
    emailAuthCodeMutation.mutateAsync(getValues("email")).then(() => {
      resetCountDown();
      startCountDown();
      clearErrors("authCode");
    });
  };

  const checkAuthCode = () => {
    checkAuthCodeMutation
      .mutateAsync({
        email: getValues("email"),
        authToken: getValues("authCode"),
      })
      .then(() => {
        setCheckAuthCodeBoxOpen.off();
      })
      .catch(() =>
        setError("authCode", { message: "인증코드가 일치하지 않습니다" })
      );
  };

  useEffect(() => {
    if (count === 0) {
      setError("authCode", {
        type: "expired",
        message: "인증 코드가 만료되었습니다",
      });
    }
  }, [count]);

  const bgColor = useColorModeValue("gray.0", "#1A202C");
  const cardBgColor = useColorModeValue("white", "whiteAlpha.50");
  const color = useColorModeValue("gray.7", "whiteAlpha.800");

  return (
    <Center w="full" minH="100vh" bgColor={bgColor} py={{ md: "3rem" }}>
      {isChangePasswordComplete ? (
        <PasswordChangeComplete />
      ) : (
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
            비밀번호 재설정
          </Heading>
          <Divider />
          <Flex
            direction="column"
            w="full"
            px={{ base: "1rem" }}
            py={{ base: "1rem", md: "2rem" }}
          >
            <Flex direction="column" alignItems="center" gap="1rem" w="full">
              <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="1.5rem">
                  <FormControl isInvalid={getFieldState("email").invalid}>
                    <FormLabel ml="0.5rem" color={color} fontWeight="bold">
                      이메일
                    </FormLabel>
                    <FormHelperText ml="0.5rem" color={color}>
                      재학생은 금오공대 이메일을 사용해주세요
                    </FormHelperText>
                    <Flex alignItems="center" gap="0.5rem">
                      <InputGroup>
                        <Input
                          isInvalid={getFieldState("email").invalid}
                          color={color}
                          disabled={checkAuthCodeMutation.isSuccess}
                          placeholder="이메일"
                          {...register("email", {
                            required: true,
                            onChange: () => {
                              setCheckAuthCodeBoxOpen.off();
                              clearErrors("email");
                            },
                          })}
                        />
                        <InputRightElement>
                          {checkAuthCodeMutation.isSuccess && (
                            <Icon as={BsCheck} boxSize="2rem" color="green.5" />
                          )}
                        </InputRightElement>
                      </InputGroup>
                    </Flex>
                    <FormErrorMessage ml="0.5rem">
                      {errors.email?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    isLoading={emailAuthCodeMutation.isLoading}
                    onClick={sendEmailAuthCode}
                    isDisabled={
                      watch("email") === "" || checkAuthCodeMutation.isSuccess
                    }
                    variant="primary"
                    w="full"
                    mt="0.5rem"
                  >
                    {checkAuthCodeMutation.isSuccess
                      ? "이메일 인증완료"
                      : "이메일 인증하기"}
                  </Button>
                  {checkAuthCodeBoxOpen && (
                    <Flex
                      direction="column"
                      gap="0.5rem"
                      px="1rem"
                      py="1.5rem"
                      bgColor={cardBgColor}
                      color={color}
                    >
                      <Text ml="0.5rem" fontSize="sm">
                        이메일로 전송된 인증코드를 입력해주세요
                      </Text>

                      <Flex gap="0.5rem">
                        <InputGroup>
                          <Input
                            isInvalid={getFieldState("authCode").invalid}
                            placeholder="인증코드"
                            bgColor={bgColor}
                            color={color}
                            {...register("authCode", { required: true })}
                            maxLength={8}
                          />
                          <InputRightElement w="4rem">
                            <Text fontSize="sm" color="red.500">
                              {secondsToMMSS(count)}
                            </Text>
                          </InputRightElement>
                        </InputGroup>

                        <Button
                          onClick={checkAuthCode}
                          isLoading={checkAuthCodeMutation.isLoading}
                          isDisabled={
                            watch("authCode") === "" ||
                            getFieldState("authCode").error?.type === "expired"
                          }
                          variant="primary"
                        >
                          확인
                        </Button>
                      </Flex>
                      <Text ml="0.5rem" fontSize="sm" color="red.500">
                        {errors.authCode?.message}
                      </Text>
                      <Flex gap="0.25rem" ml="0.5rem">
                        <Text fontSize="xs">이메일을 받지 못하셨나요?</Text>
                        <Button
                          onClick={resendEmailAuthCode}
                          variant="link"
                          fontSize="xs"
                          color={color}
                        >
                          이메일 재전송
                        </Button>
                      </Flex>
                    </Flex>
                  )}
                  <FormControl>
                    <FormLabel ml="0.5rem" color={color} fontWeight="bold">
                      새 비밀번호
                    </FormLabel>
                    <FormHelperText ml="0.5rem"></FormHelperText>
                    <Flex alignItems="center" gap="0.5rem">
                      <Input
                        type="password"
                        placeholder="새 비밀번호"
                        color={color}
                        {...register("password", { required: true })}
                      />
                    </Flex>
                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={watch("password") !== watch("passwordConfirm")}
                  >
                    <FormLabel ml="0.5rem" color={color} fontWeight="bold">
                      새 비밀번호 확인
                    </FormLabel>
                    <FormHelperText ml="0.5rem"></FormHelperText>
                    <Flex alignItems="center" gap="0.5rem">
                      <Input
                        color={color}
                        isInvalid={
                          watch("password") !== watch("passwordConfirm")
                        }
                        type="password"
                        placeholder="새 비밀번호 확인"
                        {...register("passwordConfirm", {
                          required: true,
                        })}
                      />
                    </Flex>
                    <FormErrorMessage>
                      비밀번호와 일치하지 않습니다
                    </FormErrorMessage>
                  </FormControl>

                  <Button
                    isLoading={changePasswordMutation.isLoading}
                    isDisabled={
                      !isValid ||
                      !checkAuthCodeMutation.isSuccess ||
                      !!errors.nickname ||
                      changePasswordMutation.isLoading
                    }
                    type="submit"
                    variant="primary"
                  >
                    비밀번호 변경하기
                  </Button>
                </Flex>
              </form>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Center>
  );
};
