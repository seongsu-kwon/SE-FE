import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { openColors } from "@/styles";

const PasswordInput = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="sm">
      <Input
        pr="4rem"
        type={show ? "text" : "password"}
        placeholder="비밀번호를 입력해주세요."
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.5rem"
          bgColor={openColors.gray[3]}
          _hover={{ bgColor: openColors.gray[4] }}
          size="sm"
          onClick={handleClick}
        >
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export const CategoryAndPrivacySetting = (props: {
  CATEGORY_OPTIONS: Array<{ id: string; value: string }>;
}) => {
  const { CATEGORY_OPTIONS } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState<string>("카테고리");
  const [subscript, setSubscript] = useState<string>("");
  const [active, setActive] = useState<string>("");

  const selectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (
      CATEGORY_OPTIONS.find((option) => option.value === value) === undefined
    ) {
      setSelectedCategory("카테고리");
    } else {
      setSelectedCategory(value);
    }
  };

  const cancelClick = () => {
    if (
      CATEGORY_OPTIONS.find(
        (option) => (option.value === selectedCategory) !== undefined
      )
    ) {
      onClose();
    } else {
      setSelectedCategory("카테고리");
      onClose();
    }

    setSubscript("공개범위");
  };

  const onClickDisclosure = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerHTML } = e.currentTarget;

    if (innerHTML === "전체") {
      setSubscript("모든 사용자가 볼 수 있습니다.");
    } else if (innerHTML === "금오인") {
      setSubscript("인증된 금오인만 볼 수 있습니다.");
    } else if (innerHTML === "비밀") {
      setSubscript("비밀글입니다.");
    }

    setActive(innerHTML);
  };

  return (
    <Center h="60px">
      <ButtonGroup gap="2.5rem">
        <Button variant="link" color={openColors.red[5]}>
          취소
        </Button>
        <Button variant="link" onClick={onOpen}>
          {selectedCategory} / {active} 설정
        </Button>
        <Button variant="link" color={openColors.blue[5]}>
          등록
        </Button>
      </ButtonGroup>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>카테고리 / 공개범위 설정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my="15px">
              <Heading as="h4" size="sm" pb="5px">
                카테고리
              </Heading>
              <Select
                placeholder="카테고리"
                py="5px"
                onChange={selectOption}
                _hover={{ borderColor: openColors.blue[5] }}
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Select>
            </Box>

            <Box my="15px">
              <Box display="flex">
                <Heading as="h4" size="sm" pb="5px">
                  공개범위
                </Heading>
                <Text p="3px 0 0 3px" fontSize="xs">
                  {subscript}
                </Text>
              </Box>

              <Flex direction="row" py="5px">
                <Button
                  variant={active === "전체" ? "primary" : "outline"}
                  flexGrow="1"
                  borderRadius="0"
                  w="150px"
                  borderColor={openColors.gray[3]}
                  borderWidth="0.6px"
                  onClick={onClickDisclosure}
                >
                  전체
                </Button>
                <Button
                  variant={active === "금오인" ? "primary" : "outline"}
                  flexGrow="1"
                  borderRadius="0"
                  w="150px"
                  borderColor={openColors.gray[3]}
                  borderWidth="0.6px"
                  onClick={onClickDisclosure}
                >
                  금오인
                </Button>
                <Button
                  variant={active === "비밀" ? "primary" : "outline"}
                  flexGrow="1"
                  borderRadius="0"
                  w="150px"
                  borderColor={openColors.gray[3]}
                  borderWidth="0.6px"
                  onClick={onClickDisclosure}
                >
                  비밀
                </Button>
              </Flex>
              {active === "비밀" ? <PasswordInput /> : ""}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant={"danger"} onClick={cancelClick} mr="9px">
              취소
            </Button>
            <Button variant={"primary"} onClick={onClose}>
              설정
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export const DesktopCategoryAndPrivacySetting = (props: {
  CATEGORY_OPTIONS: Array<{ id: string; value: string }>;
}) => {
  const { CATEGORY_OPTIONS } = props;
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subscript, setSubscript] = useState<string>("");
  const [active, setActive] = useState<string>("");

  const selectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const onClickDisclosure = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { innerHTML } = e.currentTarget;

    if (innerHTML === "전체") {
      setSubscript("모든 사용자가 볼 수 있습니다.");
    } else if (innerHTML === "금오인") {
      setSubscript("인증된 금오인만 볼 수 있습니다.");
    } else if (innerHTML === "비밀") {
      setSubscript("비밀글입니다.");
    }

    setActive(innerHTML);
  };

  return (
    <Flex
      direction="row"
      maxWidth="984px"
      minHeight="75px"
      margin="60px auto 0 auto"
      borderTopWidth="0.6px"
      borderBottomWidth="0.6px"
      borderTopColor={openColors.gray[3]}
      borderBottomColor={openColors.gray[3]}
    >
      <Box my="10px" mr="80px">
        <Heading as="h4" size="md" pb="5px">
          카테고리
        </Heading>
        <Select
          placeholder="카테고리"
          py="7px"
          w="20rem"
          maxW="260px"
          borderWidth="0.2px"
          borderColor={openColors.gray[3]}
          borderRadius="5"
          onChange={selectOption}
          _hover={{ borderColor: openColors.blue[5] }}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
        </Select>
      </Box>
      <Box my="10px" ml="50px" maxW="344px">
        <Box display="flex">
          <Heading as="h4" size="md" pb="5px" pr="5px">
            공개범위
          </Heading>
          <Text pt="5px" fontSize="sm">
            {subscript}
          </Text>
        </Box>

        <Flex direction="row" py="7px">
          <Button
            variant={active === "전체" ? "primary" : "outline"}
            flexGrow="1"
            borderRadius="0"
            w="150px"
            borderColor={openColors.gray[3]}
            borderWidth="1px"
            onClick={onClickDisclosure}
          >
            전체
          </Button>
          <Button
            variant={active === "금오인" ? "primary" : "outline"}
            flexGrow="1"
            borderRadius="0"
            w="150px"
            borderColor={openColors.gray[3]}
            borderWidth="0.6px"
            onClick={onClickDisclosure}
          >
            금오인
          </Button>
          <Button
            variant={active === "비밀" ? "primary" : "outline"}
            flexGrow="1"
            borderRadius="0"
            w="150px"
            borderColor={openColors.gray[3]}
            borderWidth="0.6px"
            onClick={onClickDisclosure}
          >
            비밀
          </Button>
        </Flex>
        {active === "비밀" ? <PasswordInput /> : ""}
      </Box>
    </Flex>
  );
};
