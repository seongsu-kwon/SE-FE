import {
  Button,
  Flex,
  Icon,
  Input,
  Spacer,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

type LoginFormFileds = {
  id: string;
  password: string;
};

export const LoginForm = () => {
  const [maintainLogin, setMaintainLogin] = useBoolean();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginFormFileds>();
  const onSubmit: SubmitHandler<LoginFormFileds> = (data) => console.log(data);
  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="0.5rem">
        <Input placeholder="아이디" {...register("id", { required: true })} />
        <Input
          placeholder="비밀번호"
          type="password"
          {...register("password", { required: true })}
        />
        <Button
          type="submit"
          isDisabled={!isValid}
          variant="primary"
          w="full"
          mt="0.5rem"
        >
          로그인
        </Button>
        <Flex>
          <Flex
            onClick={setMaintainLogin.toggle}
            alignItems="center"
            gap="0.25rem"
            cursor="pointer"
          >
            {maintainLogin ? (
              <Icon as={BsCheckCircleFill} color="primary" />
            ) : (
              <Icon as={BsCheckCircle} />
            )}
            <Text fontSize="sm">로그인 유지</Text>
          </Flex>
          <Spacer />
          <Link to="user/password">
            <Text fontSize="sm" _hover={{ textDecoration: "underline" }}>
              비밀번호 재설정
            </Text>
          </Link>
        </Flex>
      </Flex>
    </form>
  );
};
