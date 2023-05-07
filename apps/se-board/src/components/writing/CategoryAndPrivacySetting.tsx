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
import { Category } from "@types";
import React, { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import {
  useAnonymousAndPined,
  usePasswordInput,
  useSelectCategory,
  useSelectDisclosure,
} from "@/hooks";
import { useGetCategoryQuery } from "@/react-query/hooks";
import { beforePostState, modifyPostState, writePostState } from "@/store";
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
  isModified: boolean;
  onClickRegistration?: () => void;
}

const privacyOptions = [
  { eng: "PUBLIC", kor: "전체" },
  { eng: "KUMOH", kor: "금오인" },
  { eng: "SECRET", kor: "비밀" },
];

export const CategoryAndPrivacySetting = ({
  isModified,
  onClickRegistration,
}: CategoryAndPrivacySettingProps) => {
  const mainCategoryId = Number(useLocation().pathname.split("/")[1]);

  const [beforePost, setBeforePost] = useRecoilState(beforePostState);
  const [writePost, setWritePost] = useRecoilState(writePostState);
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [prevOption, setPrevOption] = useState({
    category: beforePost.category || { categoryId: -1, name: "카테고리" },
    active: beforePost.exposeType || "전체",
    subscript: "",
    password: "",
    pined: beforePost.isPined || false,
    isAnonymous: false,
  });
  const { selectedCategory, setSelectedCategory, selectOption } =
    useSelectCategory(isModified, beforePost.category);
  const { subscript, setSubscript, active, setActive, onClickDisclosure } =
    useSelectDisclosure(
      privacyOptions.find((value) => value.eng === beforePost.exposeType)
        ?.kor || "",
      isModified
    );
  const { password, setPassword, show, handleClick, handleChange } =
    usePasswordInput(isModified);
  const {
    isAnonymous,
    setIsAnonymous,
    isPined,
    setIsPined,
    onClickAnonymous,
    onClickPined,
  } = useAnonymousAndPined(isModified, beforePost.isPined);

  // 카테고리 조회
  const { data, error, isLoading, isSuccess } =
    useGetCategoryQuery(mainCategoryId);

  const [categoryOptions, setCategoryOptions] = useState<
    Category[] | undefined
  >(data?.subMenu);

  useEffect(() => {
    setCategoryOptions(data?.subMenu);
  }, []);

  const settingClick = () => {
    setPrevOption({
      category: selectedCategory,
      active: active,
      pined: isPined,
      subscript,
      password,
      isAnonymous,
    });

    onClose();
  };

  const cancelClick = () => {
    setSelectedCategory(prevOption.category);
    setActive(prevOption.active);
    setSubscript(prevOption.subscript);
    setPassword(prevOption.password);
    setIsAnonymous(prevOption.isAnonymous);
    setIsPined(prevOption.pined);

    if (!isModified) {
      setWritePost({
        ...writePost,
        categoryId: prevOption.category.categoryId,
        pined: prevOption.pined,
        exposeOption: {
          name: prevOption.active,
          password: prevOption.password,
        },
      });
    } else {
      setModifyPost({
        ...modifyPost,
        categoryId: prevOption.category.categoryId,
        pined: prevOption.pined,
        exposeOption: {
          name: prevOption.active,
          password: prevOption.password,
        },
      });
    }
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
          {selectedCategory.name === "" ? "카테고리" : selectedCategory.name} /
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
                placeholder={prevOption.category.name}
                py="4px"
                onChange={selectOption}
                _hover={{ borderColor: "blue.500" }}
              >
                {categoryOptions?.map((option) => (
                  <option id={String(option.menuId)} value={option.name} />
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
                    variant={active === option.kor ? "primary" : "outline"}
                    flexGrow="1"
                    borderRadius="0"
                    w="150px"
                    border={`1px solid ${openColors.gray[3]}`}
                    onClick={onClickDisclosure}
                  >
                    {option.kor}
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
                  isChecked={isAnonymous}
                  onChange={onClickAnonymous}
                >
                  익명글 작성
                </Checkbox>
              )}
              <Checkbox
                size="md"
                borderRadius="3px"
                borderColor="gray.5"
                color={openColors.gray[7]}
                isChecked={isPined}
                onChange={onClickPined}
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
  isModified,
}: CategoryAndPrivacySettingProps) => {
  const mainCategoryId = Number(useLocation().pathname.split("/")[1]);

  const [beforePost, setBeforePost] = useRecoilState(beforePostState); // 게시글 수정 시 해당 게시글 정보

  const { selectedCategory, selectOption } = useSelectCategory(
    isModified,
    beforePost.category
  );
  const { subscript, active, onClickDisclosure } = useSelectDisclosure(
    privacyOptions.find((value) => value.eng === beforePost.exposeType)?.kor ||
      "",
    isModified
  );
  const { password, show, handleClick, handleChange } =
    usePasswordInput(isModified);
  const {
    isAnonymous,
    setIsAnonymous,
    isPined,
    setIsPined,
    onClickAnonymous,
    onClickPined,
  } = useAnonymousAndPined(isModified, beforePost.isPined);

  // 카테고리 조회
  const { data, error, isLoading, isSuccess } =
    useGetCategoryQuery(mainCategoryId);

  const [categoryOptions, setCategoryOptions] = useState<
    Category[] | undefined
  >(data?.subMenu);

  useEffect(() => {
    setCategoryOptions(data?.subMenu);
  }, [data]);

  return (
    <Flex
      maxW="100%"
      minHeight="75px"
      margin="60px auto 0 auto"
      borderY={`1px solid ${openColors.gray[3]}`}
      justifyContent="space-between"
    >
      <Box my="10px">
        <Heading as="h4" size="md" pb="4px">
          카테고리
        </Heading>
        <Select
          placeholder={selectedCategory.name}
          py="8px"
          w="20rem"
          maxW="260px"
          border={`1px solid ${openColors.gray[3]}`}
          borderRadius="5"
          onChange={selectOption}
          _hover={{ borderColor: openColors.blue[5] }}
        >
          {categoryOptions?.map((option) => (
            <option id={String(option.menuId)} value={option.name}>
              {option.name}
            </option>
          ))}
        </Select>
      </Box>
      <Box my="10px" maxW="344px">
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
              variant={active === option.kor ? "primary" : "outline"}
              flexGrow="1"
              borderRadius="0"
              w="150px"
              border={`1px solid ${openColors.gray[3]}`}
              onClick={onClickDisclosure}
            >
              {option.kor}
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
      <Box my="auto" mr="32px">
        <Heading as="h4" size="md" pb="8px">
          추가 설정
        </Heading>
        <Box py={isModified ? "8px" : "0"}>
          <Checkbox
            display={isModified ? "none" : "block"}
            size="md"
            borderRadius="3px"
            borderColor="gray.5"
            color={openColors.gray[7]}
            isChecked={isAnonymous}
            onChange={onClickAnonymous}
          >
            익명글 작성
          </Checkbox>
          <Checkbox
            size="md"
            borderRadius="3px"
            borderColor="gray.5"
            color={openColors.gray[7]}
            isChecked={isPined}
            onChange={onClickPined} // 게시글 수정 시 체크되어 있을 수도 있어야 함
          >
            리스트 상단 고정
          </Checkbox>
        </Box>
      </Box>
    </Flex>
  );
};
