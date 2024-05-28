import {
  Box,
  Button,
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
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCheckCircleFill } from "react-icons/bs";

import { kumohCertification } from "@/api/auth";
import { useNavigatePage } from "@/hooks";
import { useCoundDown } from "@/hooks/useCountDown";
import { useKumohCertification } from "@/react-query/hooks/auth";
import { queryKeys } from "@/react-query/queryKeys";
import { secondsToMMSS } from "@/utils/dateUtil";

const kumohDomain = "@kumoh.ac.kr";

interface KumohCertificationFormFields {
  email: string;
  authCode: string;
}
export const KumohCertificationPage = () => {
  const [checkAuthCodeBoxOpen, setCheckAuthCodeBoxOpen] = useBoolean(false);
  const [complete, setComplete] = useState(false);
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
  } = useForm<KumohCertificationFormFields>();
  const { count, startCountDown, stopCountDown, resetCountDown } =
    useCoundDown(180);

  const { emailAuthCodeMutation, checkAuthCodeMutation } =
    useKumohCertification();

  const onSubmit: SubmitHandler<KumohCertificationFormFields> = (data) => {};

  const queryClient = useQueryClient();

  const sendEmailAuthCode = () => {
    emailAuthCodeMutation
      .mutateAsync(getValues("email") + kumohDomain)
      .then(() => {
        setCheckAuthCodeBoxOpen.on();
        resetCountDown();
        startCountDown();
        clearErrors("authCode");
      })
      .catch((err) => {
        if (err.code === 110) {
          setError("email", { message: "이미 사용중인 메일입니다" });
        } else if (err.code === 111) {
          setError("email", { message: "잘못된 이메일 형식입니다" });
        }
      });
  };

  const resendEmailAuthCode = () => {
    emailAuthCodeMutation
      .mutateAsync(getValues("email") + kumohDomain)
      .then(() => {
        resetCountDown();
        startCountDown();
        clearErrors("authCode");
      });
  };

  const checkAuthCode = () => {
    checkAuthCodeMutation
      .mutateAsync({
        email: getValues("email") + kumohDomain,
        authToken: getValues("authCode"),
      })
      .then(() => {
        setCheckAuthCodeBoxOpen.off();
        kumohCertification(getValues("email") + kumohDomain).then((res) => {
          setComplete(true);
          queryClient.invalidateQueries([queryKeys.profile]);
        });
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
        border="1px solid"
        borderColor={borderColor}
        borderRadius={3}
      >
        {complete ? (
          <CompleteKumohCertification />
        ) : (
          <>
            <Heading
              fontSize={{ base: "1.25rem", md: "1.5rem" }}
              color={color}
              py="0.75rem"
            >
              금오인 인증
            </Heading>
            <Divider />
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" w="full" py="1rem" px="1rem" gap="1rem">
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel ml="0.5rem" color={color} fontWeight="bold">
                    금오메일
                  </FormLabel>
                  <FormHelperText ml="0.5rem"></FormHelperText>
                  <Flex alignItems="center" gap="0.5rem">
                    <Input
                      placeholder="금오메일"
                      color={color}
                      {...register("email", { required: true })}
                    />
                    <Text pr="1rem">@kumoh.ac.kr</Text>
                  </Flex>
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
                    : "인증코드 받기"}
                </Button>
                {checkAuthCodeBoxOpen && (
                  <Flex
                    direction="column"
                    gap="0.5rem"
                    px="1rem"
                    py="1.5rem"
                    bgColor={cardBgColor}
                  >
                    <Text ml="0.5rem" fontSize="sm" color={color}>
                      이메일로 전송된 인증코드를 입력해주세요
                    </Text>

                    <Flex gap="0.5rem">
                      <InputGroup>
                        <Input
                          isInvalid={getFieldState("authCode").invalid}
                          placeholder="인증코드"
                          color={color}
                          bgColor={bgColor}
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
                    <Flex gap="0.25rem" ml="0.5rem" color={color}>
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
                {/* <Button
                  isDisabled={!isValid}
                  type="submit"
                  variant="primary"
                  w="full"
                >
                  인증하기
                </Button> */}
              </Flex>
            </form>
          </>
        )}
      </Flex>
    </Box>
  );
};

const CompleteKumohCertification = () => {
  const { goToMyPage } = useNavigatePage();
  return (
    <Flex w="full" flexGrow={1} justifyContent="center" alignItems="center">
      <Flex direction="column" alignItems="center" gap="2rem">
        <Icon as={BsCheckCircleFill} color="primary" boxSize="5rem" />
        <Heading
          fontSize={{ base: "1rem", md: "1.5rem" }}
          color="gray.8"
          py="0.75rem"
        >
          금오인 인증 완료
        </Heading>
        <Button onClick={goToMyPage} variant="primary" fontWeight="bold">
          마이페이지로
        </Button>
      </Flex>
    </Flex>
  );
};
