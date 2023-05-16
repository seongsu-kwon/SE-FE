import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsFillLockFill } from "react-icons/bs";

interface Props {
  password: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const PWInput = ({ password, handleChange, onSubmit }: Props) => {
  return (
    <Center w="full" h="100vh" bgColor="gray.1">
      <Center
        m="auto"
        w={{ base: "50vh", md: "60vh" }}
        h={{ base: "50vh", md: "60vh" }}
        bgColor="white"
      >
        <Box w="66%" h="50%">
          <Heading as="h4" size="lg">
            <Icon as={BsFillLockFill} />
            비밀글
          </Heading>
          <Text size="xs" pt="2px" pl="3px">
            비밀번호를 입력해주세요.
          </Text>
          <InputGroup h="fit-content" my="20%">
            <Input
              w={{ base: "150px", md: "200px" }}
              size={{ base: "sm", md: "md" }}
              type="password"
              onChange={handleChange}
              value={password}
              placeholder="비밀번호"
              borderColor="gray.6"
            />
            <Button
              size={{ base: "sm", md: "md" }}
              variant="primary"
              onClick={onSubmit}
              ml="12px"
            >
              확인
            </Button>
          </InputGroup>
        </Box>
      </Center>
    </Center>
  );
};
