import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import {
  usePostReplyMutation,
  usePutCommentMutation,
  usePutReplyMutation,
} from "@/react-query/hooks";
import { refetchCommentState } from "@/store/CommentState";
import { openColors } from "@/styles";

interface SubCommentInputProps {
  superCommentId: number | null;
  commentId: number | undefined;
  tagCommentId: number | null;
  subCommentInputRef?: React.MutableRefObject<HTMLTextAreaElement | null>;
  setIsWriteSubComment: React.Dispatch<React.SetStateAction<boolean>>;
  contents: string;
  setIsModify?: React.Dispatch<React.SetStateAction<boolean>>;
  isReply: boolean; // true: 답글, false: 댓글
  isWritingReply: boolean; // true: 답글 작성 중, false: 댓글, 답글 수정 중
  isSecreted?: boolean;
}

export const SubCommentInput = ({
  superCommentId,
  commentId,
  tagCommentId,
  setIsWriteSubComment,
  subCommentInputRef,
  contents,
  setIsModify,
  isReply,
  isWritingReply,
  isSecreted,
}: SubCommentInputProps) => {
  const { postId } = useParams<{ postId: string }>();

  const [comment, setComment] = useState<string>(contents);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSecret, setIsSecret] = useState(isSecreted || false);

  const [refetchComment, setRefetchComment] =
    useRecoilState(refetchCommentState);

  const {
    mutate: putCommentMutate,
    isLoading: isPutLoading,
    isError: isPutError,
    isSuccess: isPutSuccess,
  } = usePutCommentMutation(postId);
  const {
    mutate: putReplyMutate,
    isLoading: isPutReplyLoading,
    isError: isPutReplyError,
    isSuccess: isPutReplySuccess,
  } = usePutReplyMutation(postId);
  const {
    mutate: postReplyMutate,
    isLoading: isPostReplyLoading,
    isError: isPostReplyError,
    isSuccess: isPostReplySuccess,
  } = usePostReplyMutation(postId);

  useEffect(() => {
    if (subCommentInputRef?.current) {
      subCommentInputRef.current.focus();
    }
  }, [subCommentInputRef]);

  const handleSubmitSubComment = () => {
    // TODO: 답글 등록, state 초기화
    if (!isWritingReply) {
      //수정
      if (!isReply) {
        // 댓글 수정
        if (commentId) {
          putCommentMutate({
            commentId,
            putCommentData: {
              contents: comment,
              isReadOnlyAuthor: isSecret,
            },
          });
        }
      } else {
        // 답글 수정
        if (commentId) {
          putReplyMutate({
            replyId: commentId,
            putReplyData: {
              contents: comment,
              isReadOnlyAuthor: isSecret,
            },
          });
        }
      }
    } else {
      //답글 작성
      if (superCommentId && tagCommentId) {
        postReplyMutate({
          postId: Number(postId),
          superCommentId: superCommentId,
          tagCommentId: tagCommentId,
          contents: comment,
          anonymous: isAnonymous,
          readOnlyAuthor: isSecret,
        });
      }
    }

    if (isPostReplySuccess || isPutReplySuccess || isPutSuccess) {
      setComment("");
      setIsAnonymous(false);
      setIsSecret(false);

      setRefetchComment(true);
    }
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          minH="100px"
          h={{ md: "120px" }}
          maxW={{ base: "600px", md: "100%" }}
          borderRadius={{ base: "0", md: "8px" }}
          border={`1px solid ${openColors.gray[5]}`}
          focusBorderColor={openColors.blue[5]}
          my="10px"
          mx={{ base: "12px", md: "0" }}
          ref={subCommentInputRef}
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
            if (isWritingReply) {
              setIsWriteSubComment(false);
            } else {
              setIsModify && setIsModify(false);
            }
          }}
        >
          취소
        </Button>
        <Button
          variant={comment !== "" ? "primary" : "primary-inActive"}
          size={{ base: "sm", md: "md" }}
          onClick={handleSubmitSubComment}
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
          <Box
            display={isWritingReply ? "flex" : "none"}
            alignItems="center"
            mr={{ base: "12px", sm: "16px" }}
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
