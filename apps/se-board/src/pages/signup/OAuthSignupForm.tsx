import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { OAuthUserBasicInfoResponse } from "@types";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCheck } from "react-icons/bs";
import { useDebouncedCallback } from "use-debounce";

import { useCoundDown } from "@/hooks/useCountDown";
import { useSignup } from "@/react-query/hooks/auth";
import { secondsToMMSS } from "@/utils/dateUtil";

type OAuthSignupFormFileds = {
  email: string;
  authCode: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  provider: string;
  subject: string;
};

export const OAuthSignupForm = ({
  info,
}: {
  info?: OAuthUserBasicInfoResponse;
}) => {
  const [checkAuthCodeBoxOpen, setCheckAuthCodeBoxOpen] = useBoolean(false);
  const {
    register,
    getFieldState,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<OAuthSignupFormFileds>({ mode: "onBlur" });

  const { count, startCountDown, stopCountDown, resetCountDown } =
    useCoundDown(180);

  const {
    emailAuthCodeMutation,
    checkAuthCodeMutation,
    oAuthSignupMutation,
    checkDuplicatedNicnameMutation,
  } = useSignup();

  const onSubmit: SubmitHandler<OAuthSignupFormFileds> = (data) =>
    oAuthSignupMutation.mutate({
      email: data.email,
      name: data.name,
      nickname: data.nickname,
      password: data.password,
      provider: data.provider,
      subject: data.subject,
    });

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
        setError("email", { message: err });
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

  const checkDuplicatedNickname = () => {
    checkDuplicatedNicnameMutation
      .mutateAsync(getValues("nickname"))
      .then((res) => {
        if (res.data.duplication)
          setError("nickname", { message: "중복된 닉네임입니다" });
      });
  };

  const onChangeNickname = useDebouncedCallback(checkDuplicatedNickname, 300);

  useEffect(() => {
    if (count === 0) {
      setError("authCode", {
        type: "expired",
        message: "인증 코드가 만료되었습니다",
      });
    }
  }, [count]);

  useEffect(() => {
    setValue("email", info?.email ?? "");
    setValue("name", info?.name ?? "");
    setValue("nickname", info?.nickname ?? "");
    setValue("provider", info?.provider ?? "");
    setValue("subject", info?.subject ?? "");
    checkDuplicatedNickname();
  }, [info]);

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="1.5rem">
        <FormControl isInvalid={getFieldState("email").invalid}>
          <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
            이메일
          </FormLabel>
          <FormHelperText ml="0.5rem">
            재학생은 금오공대 이메일을 사용해주세요
          </FormHelperText>
          <Flex alignItems="center" gap="0.5rem">
            <InputGroup>
              <Input
                isInvalid={getFieldState("email").invalid}
                disabled={true}
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
          isDisabled={watch("email") === "" || checkAuthCodeMutation.isSuccess}
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
            bgColor="gray.1"
          >
            <Text ml="0.5rem" fontSize="sm">
              이메일로 전송된 인증코드를 입력해주세요
            </Text>

            <Flex gap="0.5rem">
              <InputGroup>
                <Input
                  isInvalid={getFieldState("authCode").invalid}
                  placeholder="인증코드"
                  bgColor="white"
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
                color="gray.8"
              >
                이메일 재전송
              </Button>
            </Flex>
          </Flex>
        )}
        <FormControl>
          <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
            비밀번호
          </FormLabel>
          <FormHelperText ml="0.5rem"></FormHelperText>
          <Flex alignItems="center" gap="0.5rem">
            <Input
              type="password"
              placeholder="비밀번호"
              {...register("password", { required: true })}
            />
          </Flex>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={watch("password") !== watch("passwordConfirm")}>
          <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
            비밀번호 확인
          </FormLabel>
          <FormHelperText ml="0.5rem"></FormHelperText>
          <Flex alignItems="center" gap="0.5rem">
            <Input
              isInvalid={watch("password") !== watch("passwordConfirm")}
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordConfirm", {
                required: true,
              })}
            />
          </Flex>
          <FormErrorMessage>비밀번호와 일치하지 않습니다</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
            이름
          </FormLabel>
          <FormHelperText ml="0.5rem"></FormHelperText>
          <Flex alignItems="center" gap="0.5rem">
            <Input
              placeholder="이름"
              {...register("name", { required: true })}
            />
          </Flex>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.nickname}>
          <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
            닉네임
          </FormLabel>
          <FormHelperText ml="0.5rem"></FormHelperText>
          <Flex alignItems="center" gap="0.5rem">
            <InputGroup>
              <Input
                isInvalid={getFieldState("nickname").invalid}
                placeholder="닉네임(2자~8자)"
                {...register("nickname", {
                  required: true,
                  minLength: { value: 2, message: "닉네임은 2자 이상입니다" },
                  maxLength: { value: 8, message: "닉네임은 8자 이하입니다" },
                  onChange: onChangeNickname,
                })}
                minLength={2}
                maxLength={8}
              />
              <InputRightElement>
                {checkDuplicatedNicnameMutation.isLoading && (
                  <Spinner
                    thickness="0.2rem"
                    size="sm"
                    emptyColor="gray.2"
                    color="primary"
                  />
                )}
                {checkDuplicatedNicnameMutation.isSuccess &&
                  !getFieldState("nickname").invalid && (
                    <Icon as={BsCheck} boxSize="2rem" color="green.5" />
                  )}
              </InputRightElement>
            </InputGroup>
          </Flex>
          <FormErrorMessage ml="0.5rem">
            {errors.nickname?.message}
          </FormErrorMessage>
        </FormControl>
        <Input hidden {...register("provider", { required: true })} />
        <Input hidden {...register("subject", { required: true })} />
        <Button
          isLoading={oAuthSignupMutation.isLoading}
          isDisabled={
            !isValid ||
            !checkAuthCodeMutation.isSuccess ||
            !!errors.nickname ||
            oAuthSignupMutation.isLoading
          }
          type="submit"
          variant="primary"
        >
          회원가입하기
        </Button>
      </Flex>
    </form>
  );
};
