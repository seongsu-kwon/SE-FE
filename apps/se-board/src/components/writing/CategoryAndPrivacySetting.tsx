import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  IconButton,
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
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

import {
  usePasswordInput,
  useSelectCategory,
  useSelectDisclosure,
} from "@/hooks";
import { openColors } from "@/styles";

interface PasswordInputProps {
  password: string;
  show: boolean;
  handleClick: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({
  password,
  show,
  handleClick,
  handleChange,
}: PasswordInputProps) => {
  return (
    <InputGroup size="sm">
      <Input
        pr="4rem"
        type={show ? "text" : "password"}
        onChange={handleChange}
        value={password}
        placeholder="비밀번호를 입력해주세요."
      />
      <InputRightElement width="4.5rem">
        <Tooltip
          label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
          closeDelay={2000}
        >
          <IconButton
            aria-label="비밀번호 보기"
            h="1.5rem"
            bgColor="gray.200"
            _hover={{ bgColor: "gray.300" }}
            size="sm"
            onClick={handleClick}
            icon={show ? <BsEyeSlashFill /> : <BsEyeFill />}
          />
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
};

interface CategoryAndPrivacySettingProps {
  categoryOptions: { id: string; value: string }[];
}

const privacyOptions = ["전체", "금오인", "비밀"];

export const CategoryAndPrivacySetting = ({
  categoryOptions,
}: CategoryAndPrivacySettingProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [prevOption, setPrevOption] = useState({
    category: "카테고리",
    active: "공개범위",
    subscript: "",
    password: "",
  });
  const { selectedCategory, setSelectedCategory, selectOption } =
    useSelectCategory();
  const { subscript, setSubscript, active, setActive, onClickDisclosure } =
    useSelectDisclosure();
  const { password, show, handleClick, handleChange } = usePasswordInput();

  const settingClick = () => {
    setPrevOption({
      category: selectedCategory,
      active: active,
      subscript,
      password,
    });
    onClose();
  };

  const cancelClick = () => {
    setSelectedCategory(prevOption.category);
    setActive(prevOption.active);
    setSubscript(prevOption.subscript);
    onClose();
  };

  return (
    <Center h="60px">
      <ButtonGroup gap="2.5rem">
        <Button variant="link" color="red.500">
          취소
        </Button>
        <Button variant="link" onClick={onOpen}>
          {selectedCategory === "" ? "카테고리" : selectedCategory} /
          {active === "" ? " 공개범위 " : ` ${active} `}
          설정
        </Button>
        <Button variant="link" color="blue.500">
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
              <Heading as="h4" size="sm" pb="4px">
                카테고리
              </Heading>
              <Select
                placeholder="카테고리"
                py="4px"
                onChange={selectOption}
                _hover={{ borderColor: "blue.500" }}
              >
                {categoryOptions.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Select>
            </Box>

            <Box my="16px">
              <Box display="flex">
                <Heading as="h4" size="sm" pb="4px">
                  공개범위
                </Heading>
                <Text p="3px 0 0 3px" fontSize="xs">
                  {subscript}
                </Text>
              </Box>

              <Flex py="4px">
                {privacyOptions.map((option) => (
                  <Button
                    variant={active === option ? "primary" : "outline"}
                    flexGrow="1"
                    borderRadius="0"
                    w="150px"
                    border={`1px solid ${openColors.gray[3]}`}
                    onClick={onClickDisclosure}
                  >
                    {option}
                  </Button>
                ))}
              </Flex>
              {active === "비밀" ? (
                <PasswordInput
                  password={password}
                  show={show}
                  handleClick={handleClick}
                  handleChange={handleChange}
                />
              ) : (
                ""
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant={"danger"} onClick={cancelClick} mr="8px">
              취소
            </Button>
            <Button variant={"primary"} onClick={settingClick}>
              설정
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export const DesktopCategoryAndPrivacySetting = ({
  categoryOptions,
}: CategoryAndPrivacySettingProps) => {
  const { selectOption } = useSelectCategory();
  const { subscript, active, onClickDisclosure } = useSelectDisclosure();
  const { password, show, handleClick, handleChange } = usePasswordInput();

  return (
    <Flex
      maxWidth="full"
      minHeight="75px"
      margin="60px auto 0 auto"
      borderY={`1px solid ${openColors.gray[3]}`}
    >
      <Box my="10px" mr="80px">
        <Heading as="h4" size="md" pb="4px">
          카테고리
        </Heading>
        <Select
          placeholder="카테고리"
          py="8px"
          w="20rem"
          maxW="260px"
          border={`1px solid ${openColors.gray[3]}`}
          borderRadius="5"
          onChange={selectOption}
          _hover={{ borderColor: openColors.blue[5] }}
        >
          {categoryOptions.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
        </Select>
      </Box>
      <Box my="10px" ml="50px" maxW="344px">
        <Box display="flex">
          <Heading as="h4" size="md" pb="4px" pr="4px">
            공개범위
          </Heading>
          <Text h="fit-content" pt="5px" fontSize="sm">
            {subscript}
          </Text>
        </Box>

        <Flex py="6px">
          {privacyOptions.map((option) => (
            <Button
              variant={active === option ? "primary" : "outline"}
              flexGrow="1"
              borderRadius="0"
              w="150px"
              border={`1px solid ${openColors.gray[3]}`}
              onClick={onClickDisclosure}
            >
              {option}
            </Button>
          ))}
        </Flex>
        {active === "비밀" ? (
          <PasswordInput
            password={password}
            show={show}
            handleClick={handleClick}
            handleChange={handleChange}
          />
        ) : (
          ""
        )}
      </Box>
    </Flex>
  );
};
