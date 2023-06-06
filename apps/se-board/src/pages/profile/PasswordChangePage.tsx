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
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCheckCircleFill } from "react-icons/bs";

import { useNavigatePage } from "@/hooks";
import { useChangePassword } from "@/react-query/hooks/auth";

interface ChangePasswordFormFields {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}
export const PasswordChangepage = () => {
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
  } = useForm<ChangePasswordFormFields>();

  const { mutateAsync } = useChangePassword();

  const onSubmit: SubmitHandler<ChangePasswordFormFields> = (data) => {
    mutateAsync({
      nowPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
      .then((res) => {
        setComplete(true);
      })
      .catch((err) => {
        if (err.code === 101) {
          setError("currentPassword", {
            message: "비밀번호가 일치하지 않습니다",
          });
        }
      });
  };

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
          <CompleteChangePasssword />
        ) : (
          <>
            <Heading
              fontSize={{ base: "1.25rem", md: "1.5rem" }}
              color="gray.8"
              py="0.75rem"
            >
              비밀번호 변경
            </Heading>
            <Divider />
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" w="full" py="1rem" px="1rem" gap="1rem">
                <FormControl isInvalid={!!errors.currentPassword}>
                  <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
                    현재 비밀번호
                  </FormLabel>
                  <FormHelperText ml="0.5rem"></FormHelperText>
                  <Flex alignItems="center" gap="0.5rem">
                    <Input
                      type="password"
                      placeholder="현재 비밀번호"
                      {...register("currentPassword", { required: true })}
                    />
                  </Flex>
                  <FormErrorMessage>
                    {errors.currentPassword?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
                    새 비밀번호
                  </FormLabel>
                  <FormHelperText ml="0.5rem"></FormHelperText>
                  <Flex alignItems="center" gap="0.5rem">
                    <Input
                      type="password"
                      placeholder="새 비밀번호"
                      {...register("newPassword", { required: true })}
                    />
                  </Flex>
                  <FormErrorMessage></FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    watch("newPassword") !== watch("newPasswordConfirm")
                  }
                >
                  <FormLabel ml="0.5rem" color="gray.8" fontWeight="bold">
                    새 비밀번호 확인
                  </FormLabel>
                  <FormHelperText ml="0.5rem"></FormHelperText>
                  <Flex alignItems="center" gap="0.5rem">
                    <Input
                      isInvalid={
                        watch("newPassword") !== watch("newPasswordConfirm")
                      }
                      type="password"
                      placeholder="새 비밀번호 확인"
                      {...register("newPasswordConfirm", {
                        required: true,
                      })}
                    />
                  </Flex>
                  <FormErrorMessage>
                    비밀번호와 일치하지 않습니다
                  </FormErrorMessage>
                </FormControl>
                <Button
                  isDisabled={
                    !isValid ||
                    watch("newPassword") !== watch("newPasswordConfirm")
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

const CompleteChangePasssword = () => {
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
          비밀번호 변경 완료
        </Heading>
        <Button onClick={goToMyPage} variant="primary" fontWeight="bold">
          마이페이지로
        </Button>
      </Flex>
    </Flex>
  );
};
