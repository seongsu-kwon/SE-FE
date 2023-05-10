import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  password: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const PWInput = ({ password, handleChange, onSubmit }: Props) => {
  return (
    <Center w="full" h="100vh" bgColor="gray.3">
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        maxW={{ base: "full", md: "480px" }}
        minH={{ base: "full", md: "400px" }}
        w="full"
        my="2rem"
        px={{ base: "1rem", md: "3rem" }}
        py="4rem"
        bgColor="white"
      >
        <Heading>비밀번호 입력</Heading>
        <InputGroup size="sm">
          <Input
            pr="2rem"
            w="300px"
            type="password"
            onChange={handleChange}
            value={password}
            placeholder="비밀번호를 입력해주세요."
          />
          <Button variant="primary" onClick={onSubmit} ml="12px">
            확인
          </Button>
        </InputGroup>
      </Flex>
    </Center>
  );
};
