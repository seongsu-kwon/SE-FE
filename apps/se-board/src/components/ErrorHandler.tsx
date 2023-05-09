import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

import { PostPage } from "@/pages";
import { useSecretPostMutation } from "@/react-query/hooks";
import { openColors } from "@/styles";
import { errorHandle } from "@/utils/errorHandling";

export const SecretPostPWInputModal = () => {
  const { postId } = useParams();
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const { mutate, isSuccess, isError, error, data } = useSecretPostMutation();

  const handleClick = () => setShow(!show);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleInput = useCallback(() => {
    mutate({ postId: Number(postId), password: password });

    if (isSuccess) {
      setPassword("");

      return PostPage({ secretData: data });
    }

    if (isError) {
      setPassword("");
      errorHandle(error);
    }
  }, []);

  return (
    <Box
      m="auto"
      maxW="200px"
      maxH="150px"
      border={`1px solid ${openColors.gray[3]}`}
    >
      <Text>해당 게시글은 비밀글입니다.</Text>
      <Text>비밀번호를 입력해주세요.</Text>
      <Flex>
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
        <Button onClick={handleInput}>입력</Button>
      </Flex>
    </Box>
  );
};

export const ErrorFieldAlert = () => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            필수 필드 누락
          </AlertDialogHeader>

          <AlertDialogBody>
            필수 필드가 누락되었습니다. 필수 필드를 모두 입력해주세요.
            <Text size="sm">
              게시글 필수 필드: 제목, 본문, 카테고리, 공개범위
            </Text>
            <Text size="sm">댓글 필수 필드: 댓글 내용</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              colorScheme="error"
              onClick={onClose}
              ml={3}
            >
              확인
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const NoPermissionsAlert = () => {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    onClose();
    navigate(-1);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            권한 없음
          </AlertDialogHeader>

          <AlertDialogBody>해당 요청에 대한 권한이 없습니다.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="error" onClick={handleConfirm} ml={3}>
              뒤로가기
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const ExceededNumberAlert = () => {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    onClose();
    navigate(-1);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            횟수 초과
          </AlertDialogHeader>

          <AlertDialogBody>
            게시글, 댓글 작성 횟수가 초과되었습니다.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="primary" onClick={handleConfirm} ml={3}>
              뒤로가기
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const NonePostAlert = () => {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    onClose();
    navigate(-1);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            게시글
          </AlertDialogHeader>

          <AlertDialogBody>해당 게시글이 존재하지 않습니다.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="primary" onClick={handleConfirm} ml={3}>
              뒤로가기
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const NoneCategoryAlert = () => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            카테고리 없음
          </AlertDialogHeader>

          <AlertDialogBody>해당 카테고리가 존재하지 않습니다.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="primary" onClick={onClose} ml={3}>
              확인
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const NoneAttachmentAlert = () => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            첨부파일
          </AlertDialogHeader>

          <AlertDialogBody>잘못된 첨부파일입니다.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="primary" onClick={onClose} ml={3}>
              확인
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const NoneCommentAlert = () => {
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            댓글
          </AlertDialogHeader>

          <AlertDialogBody>해당 댓글이 존재하지 않습니다.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="primary" onClick={onClose} ml={3}>
              확인
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const GotoLoginAlert = () => {
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleGoToLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            로그인
          </AlertDialogHeader>

          <AlertDialogBody>로그인 후 이용해 주세요.</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="primary" onClick={handleGoToLogin} ml={3}>
              로그인 페이지로 이동
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
