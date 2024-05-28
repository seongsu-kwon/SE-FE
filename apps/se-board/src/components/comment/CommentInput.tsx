import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Textarea,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

import {
  usePostCommentMutation,
  usePostReplyMutation,
  usePutCommentMutation,
  usePutReplyMutation,
} from "@/react-query/hooks";
import { useWriteCommentState } from "@/store/CommentState";
import { openColors } from "@/styles";

export const CommentInput = () => {
  const { postId } = useParams();
  const [value, setValue] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSecret, setIsSecret] = useState(false);
  const { writeCommentTrue } = useWriteCommentState();

  const postCommentMutation = usePostCommentMutation(postId);

  const queryClient = useQueryClient();

  const handleSubmit = () => {
    postCommentMutation.mutate(
      {
        postId: Number(postId),
        contents: value,
        isAnonymous: isAnonymous,
        isReadOnlyAuthor: isSecret,
      },
      {
        onSuccess: () => {
          setIsAnonymous(false);
          setValue("");
          setIsSecret(false);

          writeCommentTrue();

          queryClient.invalidateQueries(["comments", postId]);
        },
      }
    );
  };

  const color = useColorModeValue("gray.7", "whiteAlpha.800");
  const borderColor = useColorModeValue("gray.3", "whiteAlpha.400");

  return (
    <Box
      display="inline-block"
      w={{ base: "100%", md: "784px" }}
      maxW={{ base: "600px", md: "100%" }}
      pb="8px"
    >
      <Box display="flex" justifyContent="center" w={{ md: "784px" }}>
        <Textarea
          placeholder="댓글을 입력해주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          minH="100px"
          h={{ md: "120px" }}
          maxW={{ base: "600px", md: "100%" }}
          borderRadius={{ base: "0", md: "8px" }}
          border={`1px solid`}
          color={color}
          borderColor={borderColor}
          focusBorderColor={openColors.blue[5]}
          my="10px"
          mx={{ base: "12px", md: "0" }}
          resize="none"
        />
      </Box>
      <Box
        display="flex"
        w="fit-content"
        h="fit-content"
        mx={{ base: "12px", md: "0" }}
        ml={{ md: "20px" }}
        alignItems="center"
        justifyContent="right"
        float="right"
      >
        <Button
          variant={value !== "" ? "primary" : "primary-inActive"}
          isLoading={postCommentMutation.isLoading}
          loadingText="등록중"
          size={{ base: "sm", md: "md" }}
          onClick={handleSubmit}
        >
          등록
        </Button>
      </Box>
      <Box
        display="flex"
        w="fit-content"
        h="fit-content"
        minH={{ base: "30px", md: "40px" }}
        alignItems="center"
        float="right"
        color={color}
      >
        <FormControl
          display="flex"
          alignItems="center"
          h="100%"
          flexWrap="wrap"
          justifyContent="right"
        >
          <Box
            display="flex"
            alignItems="center"
            mr={{ base: "12px", sm: "16px" }}
          >
            <FormLabel htmlFor="anonymous" mb="0" mr="0" minW="36px">
              익명
            </FormLabel>
            <Switch
              id="anonymous"
              mt="3px"
              isChecked={isAnonymous}
              onChange={() => {
                setIsAnonymous(!isAnonymous);
              }}
            />
          </Box>
          <Tooltip
            hasArrow
            label="비밀댓글은 나와 게시글 작성자만 볼 수 있어요!"
            bg={openColors.gray[7]}
            closeDelay={1000}
          >
            <Box display="flex" alignItems="center">
              <FormLabel htmlFor="secret" mb="0" mr="2px" minW="64px">
                비밀댓글
              </FormLabel>
              <Switch
                id="secret"
                mt="3px"
                isChecked={isSecret}
                onChange={() => {
                  setIsSecret(!isSecret);
                }}
              />
            </Box>
          </Tooltip>
        </FormControl>
      </Box>
    </Box>
  );
};

interface SubCommentInputProps {
  superCommentId: number;
  tagCommentId: number;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  setIsWriteState: React.Dispatch<React.SetStateAction<number | null>>;
}

export const SubCommentInput = ({
  superCommentId,
  tagCommentId,
  inputRef,
  setIsWriteState,
}: SubCommentInputProps) => {
  const { postId } = useParams<{ postId: string }>();

  const { mutate: postReplyMutate, isLoading: isPostReplyLoading } =
    usePostReplyMutation(postId);

  const queryClient = useQueryClient();

  const [text, setText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSecret, setIsSecret] = useState(false);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleSubComment = () => {
    postReplyMutate(
      {
        postId: Number(postId),
        superCommentId,
        tagCommentId,
        contents: text,
        isAnonymous,
        isReadOnlyAuthor: isSecret,
      },
      {
        onSuccess: () => {
          setText("");
          setIsAnonymous(false);
          setIsSecret(false);
          setIsWriteState(null);

          queryClient.invalidateQueries(["comments", postId]);
        },
      }
    );
  };

  const color = useColorModeValue("gray.7", "whiteAlpha.800");
  const borderColor = useColorModeValue("gray.3", "whiteAlpha.400");

  return (
    <Box
      display="inline-block"
      w={{ base: "100%", md: "784px" }}
      maxW={{ base: "600px", md: "100%" }}
      pb="8px"
    >
      <Box display="flex" justifyContent="center" w={{ md: "100%" }}>
        <Textarea
          placeholder="댓글을 입력해주세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
          minH="100px"
          h={{ md: "120px" }}
          maxW={{ base: "600px", md: "100%" }}
          borderRadius={{ base: "0", md: "8px" }}
          border={`1px solid`}
          borderColor={borderColor}
          color={color}
          focusBorderColor={openColors.blue[5]}
          my="10px"
          mx={{ base: "12px", md: "0" }}
          ref={inputRef}
          resize="none"
        />
      </Box>
      <Box
        display="flex"
        minW={{ base: "110px", md: "135px" }}
        w="fit-content"
        h="fit-content"
        mx={{ base: "12px", md: "0" }}
        ml={{ md: "20px" }}
        alignItems="center"
        justifyContent="space-between"
        float="right"
      >
        <Button
          size={{ base: "sm", md: "md" }}
          bgColor="gray.4"
          _hover={{ bgColor: "gray.5" }}
          color="white"
          onClick={() => {
            setIsWriteState(null);
          }}
        >
          취소
        </Button>
        <Button
          variant={text !== "" ? "primary" : "primary-inActive"}
          isLoading={isPostReplyLoading}
          loadingText="등록중"
          size={{ base: "sm", md: "md" }}
          onClick={handleSubComment}
        >
          등록
        </Button>
      </Box>
      <Box
        display="flex"
        w="fit-content"
        h="fit-content"
        minH={{ base: "30px", md: "40px" }}
        alignItems="center"
        float="right"
      >
        <FormControl
          display="flex"
          alignItems="center"
          h="100%"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            alignItems="center"
            mr={{ base: "12px", sm: "16px" }}
            color={color}
          >
            <FormLabel htmlFor="anonymous" mb="0" mr="2px" minW="36px">
              익명
            </FormLabel>
            <Switch
              id="anonymous"
              mt="3px"
              isChecked={isAnonymous}
              onChange={() => {
                setIsAnonymous(!isAnonymous);
              }}
            />
          </Box>
          <Tooltip
            hasArrow
            label="비밀댓글은 나와 게시글 작성자만 볼 수 있어요!"
            bg={openColors.gray[7]}
            closeDelay={1000}
          >
            <Box display="flex" alignItems="center" color={color}>
              <FormLabel htmlFor="secret" mb="0" mr="2px" minW="64px">
                비밀댓글
              </FormLabel>
              <Switch
                id="secret"
                mt="3px"
                isChecked={isSecret}
                onChange={() => {
                  setIsSecret(!isSecret);
                }}
              />
            </Box>
          </Tooltip>
        </FormControl>
      </Box>
    </Box>
  );
};

interface CommentModifyInputProps {
  commentId: number;
  commentContent: string;
  isComment: boolean; // true: comment, false: subComment
  setIsModify: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

export const CommentModifyInput = ({
  commentId,
  commentContent,
  isComment,
  setIsModify,
  inputRef,
}: CommentModifyInputProps) => {
  const { postId } = useParams<{ postId: string }>();

  const { mutate: putCommentMutate, isLoading: isPutLoading } =
    usePutCommentMutation(postId);
  const { mutate: putSubCommentMutate, isLoading: isPutSubCommentLoading } =
    usePutReplyMutation(postId);

  const queryClient = useQueryClient();

  const [text, setText] = useState("");
  const [isSecret, setIsSecret] = useState(false);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    setText(commentContent);
  }, [commentContent]);

  const handlePutComment = () => {
    putCommentMutate(
      {
        commentId,
        putCommentData: {
          contents: text,
          isReadOnlyAuthor: isSecret,
        },
      },
      {
        onSuccess: () => {
          setIsModify(false);
          setText("");
          setIsSecret(false);

          queryClient.invalidateQueries(["comments", postId]);
        },
      }
    );
  };

  const handlePutSubComment = () => {
    putSubCommentMutate(
      {
        replyId: commentId,
        putReplyData: {
          contents: text,
          isReadOnlyAuthor: isSecret,
        },
      },
      {
        onSuccess: () => {
          setIsModify(false);
          setText("");
          setIsSecret(false);

          queryClient.invalidateQueries(["comments", postId]);
        },
      }
    );
  };

  return (
    <Box
      display="inline-block"
      w={{ base: "100%", md: "784px" }}
      maxW={{ base: "600px", md: "100%" }}
      pb="8px"
    >
      <Box
        display="flex"
        justifyContent="center"
        w={{ md: "784px" }}
        bgColor={openColors.white}
      >
        <Textarea
          placeholder="댓글을 입력해주세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
          minH="100px"
          h={{ md: "120px" }}
          maxW={{ base: "600px", md: "100%" }}
          borderRadius={{ base: "0", md: "8px" }}
          border={`1px solid ${openColors.gray[5]}`}
          focusBorderColor={openColors.blue[5]}
          my="10px"
          mx={{ base: "12px", md: "0" }}
          ref={inputRef}
          resize="none"
        />
      </Box>
      <Box
        display="flex"
        minW={{ base: "110px", md: "135px" }}
        w="fit-content"
        h="fit-content"
        mx={{ base: "12px", md: "0" }}
        ml={{ md: "20px" }}
        bgColor={openColors.white}
        alignItems="center"
        justifyContent="space-between"
        float="right"
      >
        <Button
          size={{ base: "sm", md: "md" }}
          bgColor="gray.4"
          _hover={{ bgColor: "gray.5" }}
          color="white"
          onClick={() => {
            setIsModify(false);
          }}
        >
          취소
        </Button>
        <Button
          variant={text !== "" ? "primary" : "primary-inActive"}
          isLoading={isComment ? isPutLoading : isPutSubCommentLoading}
          loadingText="등록 중"
          size={{ base: "sm", md: "md" }}
          onClick={isComment ? handlePutComment : handlePutSubComment}
        >
          등록
        </Button>
      </Box>
      <Box
        display="flex"
        w="fit-content"
        h="fit-content"
        minH={{ base: "30px", md: "40px" }}
        bgColor={openColors.white}
        alignItems="center"
        float="right"
      >
        <FormControl
          display="flex"
          alignItems="center"
          h="100%"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Tooltip
            hasArrow
            label="비밀댓글은 나와 게시글 작성자만 볼 수 있어요!"
            bg={openColors.gray[7]}
            closeDelay={1000}
          >
            <Box display="flex" alignItems="center">
              <FormLabel htmlFor="secret" mb="0" mr="2px" minW="64px">
                비밀댓글
              </FormLabel>
              <Switch
                id="secret"
                mt="3px"
                isChecked={isSecret}
                onChange={() => {
                  setIsSecret(!isSecret);
                }}
              />
            </Box>
          </Tooltip>
        </FormControl>
      </Box>
    </Box>
  );
};
