import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  Flex,
  Heading,
  HStack,
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
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import {
  usePasswordInput,
  useSelectCategory,
  useSelectDisclosure,
} from "@/hooks";
import { modifyPostState } from "@/store";
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
      <InputRightElement>
        <Tooltip
          label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
          closeDelay={2000}
        >
          <IconButton
            variant="ghost"
            aria-label="비밀번호 보기"
            _hover={{ bgColor: "transparent" }}
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
  beforeCategory?: string;
  // beforePrivacy?: string;
  isModified?: boolean;
  onClickRegistration?: () => void;
}

const privacyOptions = ["전체", "금오인", "비밀"];

export const CategoryAndPrivacySetting = ({
  categoryOptions,
  beforeCategory,
  isModified,
  onClickRegistration,
}: // TODO: 공개 범위 받아와서 설정 필요
CategoryAndPrivacySettingProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [prevOption, setPrevOption] = useState({
    category: beforeCategory || "카테고리",
    active: "전체",
    subscript: "",
    password: "",
  });
  const { selectedCategory, setSelectedCategory, selectOption } =
    useSelectCategory(beforeCategory);
  const { subscript, setSubscript, active, setActive, onClickDisclosure } =
    useSelectDisclosure();
  const { password, show, handleClick, handleChange } = usePasswordInput();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPined, setIsPined] = useState(false);
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);

  const settingClick = () => {
    setPrevOption({
      category: selectedCategory,
      active: active,
      subscript,
      password,
    });

    setModifyPost({
      ...modifyPost,
      // categoryId: selectedCategory, 카테고리 받아오는 로직 구현 후 선택된 카테고리 id로 수정
      // pined 여부 추가 필요
      exposeOption: {
        name: active,
        password: password,
      },
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
        <Button
          onClick={() => {
            const navigate = useNavigate();
            navigate(-1);
          }}
          variant="link"
          color="red.500"
        >
          취소
        </Button>
        <Button variant="link" onClick={onOpen}>
          {selectedCategory === "" ? "카테고리" : selectedCategory} /
          {active === "" ? " 공개범위 " : ` ${active} `}
          설정
        </Button>
        <Button variant="link" color="blue.500" onClick={onClickRegistration}>
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
                placeholder={prevOption.category}
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
            <HStack display="flex">
              {isModified ? (
                ""
              ) : (
                <Checkbox
                  size="md"
                  borderRadius="3px"
                  borderColor="gray.5"
                  color={openColors.gray[7]}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                >
                  익명 작성
                </Checkbox>
              )}
              <Checkbox
                size="md"
                borderRadius="3px"
                borderColor="gray.5"
                color={openColors.gray[7]}
                onChange={() => setIsPined(!isPined)} // 게시글 수정 시 체크되어 있을 수도 있어야 함
              >
                게시글 목록 상단 고정
              </Checkbox>
            </HStack>
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
  beforeCategory,
}: // ToDo: 공개 범위 값 받아서 미리 세팅 필요, 비밀글일 때는 새로운 비밀번호 입력 필요 Null 값일 때 기존 비밀번호
CategoryAndPrivacySettingProps) => {
  const { selectedCategory, selectOption } = useSelectCategory(beforeCategory);
  const { subscript, active, onClickDisclosure } = useSelectDisclosure();
  const { password, show, handleClick, handleChange } = usePasswordInput();

  return (
    <Flex
      maxW="100%"
      minHeight="75px"
      margin="60px auto 0 auto"
      borderY={`1px solid ${openColors.gray[3]}`}
    >
      <Box my="10px" mr="80px">
        <Heading as="h4" size="md" pb="4px">
          카테고리
        </Heading>
        <Select
          placeholder={selectedCategory}
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
