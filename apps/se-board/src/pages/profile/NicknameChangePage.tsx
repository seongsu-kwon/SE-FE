import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCheck, BsCheckCircleFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { useDebouncedCallback } from "use-debounce";

import { useNavigatePage } from "@/hooks";
import { useSignup } from "@/react-query/hooks/auth";
import { useUpdateUserProfile } from "@/react-query/hooks/useProfile";
import { user, userState } from "@/store/user";

export const NickNameChangePage = () => {
  const [nicknameValid, setNicknameValid] = useState(false);
  const [complete, setComplete] = useState(false);

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

  const { mutateAsync } = useUpdateUserProfile();

  const onSubmit: SubmitHandler<{ nickname: string }> = (data) => {
    mutateAsync({
      nickname: data.nickname,
    })
      .then((res) => {
        setComplete(true);
      })
      .catch((err) => {});
  };

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
        {complete ? (
          <CompleteChangeNickname />
        ) : (
          <>
            <Heading
              fontSize={{ base: "1.25rem", md: "1.5rem" }}
              color="gray.8"
              py="0.75rem"
            >
              닉네임 변경
            </Heading>
            <Divider />

            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" w="full" py="1rem" px="1rem" gap="1rem">
                <FormControl isInvalid={!!errors.nickname}>
                  <Flex alignItems="center" gap="0.5rem">
                    <InputGroup>
                      <Input
                        isInvalid={getFieldState("nickname").invalid}
                        placeholder="닉네임(2자~8자)"
                        {...register("nickname", {
                          required: true,
                          minLength: {
                            value: 2,
                            message: "닉네임은 2자 이상입니다",
                          },
                          maxLength: {
                            value: 8,
                            message: "닉네임은 8자 이하입니다",
                          },
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
                <Button
                  isDisabled={
                    !nicknameValid ||
                    watch("nickname") === userInfo.nickname ||
                    !isValid
                  }
                  type="submit"
                  variant="primary"
                  w="full"
                >
                  변경하기
                </Button>
              </Flex>
            </form>
          </>
        )}
      </Flex>
    </Box>
  );
};

const CompleteChangeNickname = () => {
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
          닉네임 변경 완료
        </Heading>
        <Button onClick={goToMyPage} variant="primary" fontWeight="bold">
          마이페이지로
        </Button>
      </Flex>
    </Flex>
  );
};
