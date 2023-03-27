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

interface category_option {
  id: string;
  value: string;
}

const NOTICE_CATEGORY_OPTIONS: ReadonlyArray<category_option> = [
  { id: "general", value: "일반" },
  { id: "lecture", value: "강의" },
  { id: "bachelor", value: "학사" },
  { id: "event", value: "행사" },
  { id: "studentCouncil", value: "학생회" },
];

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
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export const CategoryAndPrivacySetting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState<string>("카테고리");
  const [subscript, setSubscript] = useState<string>("");
  const [active, setActive] = useState<string>("");

  const selectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (
      NOTICE_CATEGORY_OPTIONS.find((option) => option.value === value) ===
      undefined
    ) {
      setSelectedCategory("카테고리");
    } else {
      setSelectedCategory(value);
    }
  };

  const cancelClick = () => {
    if (
      NOTICE_CATEGORY_OPTIONS.find(
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
        <Button variant="link">취소</Button>
        <Button variant="link" onClick={onOpen}>
          {selectedCategory} / {active} 설정
        </Button>
        <Button variant="link">등록</Button>
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
              <Select placeholder="카테고리" py="5px" onChange={selectOption}>
                {NOTICE_CATEGORY_OPTIONS.map((option) => (
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
                  variant="outline"
                  flexGrow="1"
                  borderRadius="0"
                  w="150px"
                  borderColor={openColors.gray[3]}
                  borderWidth="0.6px"
                  onClick={onClickDisclosure}
                  backgroundColor={active === "전체" ? openColors.blue[5] : ""}
                  color={active === "전체" ? openColors.white : ""}
                >
                  전체
                </Button>
                <Button
                  variant="outline"
                  flexGrow="1"
                  borderRadius="0"
                  w="150px"
                  borderColor={openColors.gray[3]}
                  borderWidth="0.6px"
                  onClick={onClickDisclosure}
                  backgroundColor={
                    active === "금오인" ? openColors.blue[5] : ""
                  }
                  color={active === "금오인" ? openColors.white : ""}
                >
                  금오인
                </Button>
                <Button
                  variant="outline"
                  flexGrow="1"
                  borderRadius="0"
                  w="150px"
                  borderColor={openColors.gray[3]}
                  borderWidth="0.6px"
                  onClick={onClickDisclosure}
                  backgroundColor={active === "비밀" ? openColors.blue[5] : ""}
                  color={active === "비밀" ? openColors.white : ""}
                >
                  비밀
                </Button>
              </Flex>
              {active === "비밀" ? <PasswordInput /> : ""}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant={"danger-outline"} onClick={cancelClick} mr="9px">
              취소
            </Button>
            <Button variant={"primary-outline"} onClick={onClose}>
              설정
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export const DesktopCategoryAndPrivacySetting = () => {
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
        >
          {NOTICE_CATEGORY_OPTIONS.map((option) => (
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
            variant="outline"
            flexGrow="1"
            borderRadius="0"
            w="150px"
            borderColor={openColors.gray[3]}
            borderWidth="1px"
            onClick={onClickDisclosure}
            backgroundColor={active === "전체" ? openColors.blue[5] : ""}
            color={active === "전체" ? openColors.white : ""}
          >
            전체
          </Button>
          <Button
            variant="outline"
            flexGrow="1"
            borderRadius="0"
            w="150px"
            borderColor={openColors.gray[3]}
            borderWidth="0.6px"
            onClick={onClickDisclosure}
            backgroundColor={active === "금오인" ? openColors.blue[5] : ""}
            color={active === "금오인" ? openColors.white : ""}
          >
            금오인
          </Button>
          <Button
            variant="outline"
            flexGrow="1"
            borderRadius="0"
            w="150px"
            borderColor={openColors.gray[3]}
            borderWidth="0.6px"
            onClick={onClickDisclosure}
            backgroundColor={active === "비밀" ? openColors.blue[5] : ""}
            color={active === "비밀" ? openColors.white : ""}
          >
            비밀
          </Button>
        </Flex>
        {active === "비밀" ? <PasswordInput /> : ""}
      </Box>
    </Flex>
  );
};
