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

// import { usePutCommentMutation } from "@/react-query/hooks";
import { openColors } from "@/styles";

interface SubCommentInputProps {
  superCommentId: number | null;
  tagCommentId: number | null;
  tagCommentAuthorName?: string | null;
  subCommentInputRef?: React.MutableRefObject<HTMLTextAreaElement | null>;
  setIsWriteSubComment: React.Dispatch<React.SetStateAction<boolean>>;
  contents?: string;
  setIsModify?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SubCommentInput = ({
  superCommentId,
  tagCommentId,
  tagCommentAuthorName,
  setIsWriteSubComment,
  subCommentInputRef,
  contents,
  setIsModify,
}: SubCommentInputProps) => {
  const { postId } = useParams<{ postId: string }>();

  const initialComment = {
    tag: "",
    contents: "",
  };

  if (tagCommentAuthorName !== undefined) {
    initialComment.tag = `@${tagCommentAuthorName} `;
  }

  if (contents !== undefined) {
    initialComment.contents = contents;
  }

  const [comment, setComment] = useState<string>(
    `${initialComment.tag} ${initialComment.contents}`
  );
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSecret, setIsSecret] = useState(false);

  useEffect(() => {
    if (subCommentInputRef?.current) {
      subCommentInputRef.current.focus();
    }
  }, [subCommentInputRef]);

  const handleSubmitSubComment = () => {
    // TODO: 답글 등록, state 초기화
    //답글 인지 수정 인지 확인 작업 필요 -> contents가 있으면 수정
    if (contents !== undefined) {
      //수정
    } else {
      //답글
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
          variant="danger"
          size={{ base: "sm", md: "md" }}
          onClick={() => {
            setIsWriteSubComment(false);
            setIsModify && setIsModify(false);
          }}
        >
          취소
        </Button>
        <Button
          variant="primary"
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
            display="flex"
            alignItems="center"
            mr={{ base: "12px", sm: "16px" }}
          >
            <FormLabel htmlFor="anonymous" mb="0" mr="2px" minW="36px">
              익명
            </FormLabel>
            <Switch
              id="anonymous"
              mt="3px"
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
