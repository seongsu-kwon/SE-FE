import {
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { CommentContent } from "@types";
import React, { useRef, useState } from "react";
import { BsArrowReturnRight, BsAt, BsPersonCircle } from "react-icons/bs";

import { useNavigatePage } from "@/hooks";
import { openColors } from "@/styles";
import { isModifiedContent, toYYYYMMDDHHhh } from "@/utils/dateUtils";

import { CommentMoreButton } from "../detailPost";
import { CommentModifyInput } from "./CommentInput";

interface CommentFormationProps {
  comment: CommentContent;
  setIsWriteState: React.Dispatch<React.SetStateAction<number | null>>;
  tag?: string;
}

export const CommentFormation = ({
  comment,
  setIsWriteState,
  tag,
}: CommentFormationProps) => {
  const [isModify, setIsModify] = useState<boolean>(false);

  const commentModifyAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Box w="100%" bg={openColors.white} p="16px">
      {!isModify ? (
        <>
          <Box display="flex" justifyContent="space-between">
            <AuthorInfoMenuList
              name={comment.author.name}
              authorId={comment.author.loginId}
            />
            <Box w="fit-content">
              {comment.isActive && (
                <CommentMoreButton
                  isEditable={comment.isEditable}
                  setIsModify={setIsModify}
                  commentId={comment.commentId}
                  isReply={tag ? true : false}
                />
              )}
            </Box>
          </Box>
          <Box display="inline-block" w="100%" mt="8px">
            {tag && (
              <Box
                display="flex"
                alignItems="center"
                textAlign="center"
                w="fit-content"
                h="fit-content"
                mr="6px"
                mb="-2px"
                p="1px 4px"
                bgColor="blue.1"
                color="blue.7"
                borderRadius="10px"
                float="left"
              >
                <BsAt fontSize="18px" />
                <Text whiteSpace="nowrap">{tag}</Text>
              </Box>
            )}
            <Text mb="-2px" textAlign="left" maxW="850px" whiteSpace="pre-line">
              {comment.contents}
            </Text>
          </Box>
          <Text
            textAlign="left"
            fontSize={{ base: "sm" }}
            fontWeight="400"
            mt="2px"
          >
            {toYYYYMMDDHHhh(comment.createdAt)}
            {isModifiedContent(comment.createdAt, comment.modifiedAt) && (
              <Text as="span" ml="0.25rem" color="gray.6">
                (수정됨)
              </Text>
            )}
          </Text>
          <Box
            display="flex"
            alignItems="center"
            mt="12px"
            w="fit-content"
            color="gray.6"
            _hover={{ color: "gray.7" }}
          >
            {comment.isActive && (
              <Button
                size="sm"
                p="0"
                leftIcon={<BsArrowReturnRight />}
                variant="ghost"
                _hover={{ bgColor: openColors.white }}
                onClick={() => setIsWriteState(comment.commentId)}
              >
                답글 작성
              </Button>
            )}
          </Box>
        </>
      ) : (
        <CommentModifyInput
          commentId={comment.commentId}
          commentContent={comment.contents}
          isComment={tag ? false : true}
          setIsModify={setIsModify}
          inputRef={commentModifyAreaRef}
        />
      )}
    </Box>
  );
};

const AuthorInfoMenuList = ({
  name,
  authorId,
}: {
  name: string;
  authorId: string | null;
}) => {
  const { goToProfilePage } = useNavigatePage();

  return (
    <Menu autoSelect={false}>
      <MenuButton cursor={!authorId ? "not-allowed" : "pointer"}>
        <Box display="flex" alignItems="center" w="fit-content">
          <Icon as={BsPersonCircle} boxSize="32px" color="gray.4" my="auto" />
          <Text px="10px" fontSize="lg" fontWeight="600" whiteSpace="nowrap">
            {name}
          </Text>
        </Box>
      </MenuButton>
      {!!authorId && (
        <MenuList>
          <MenuItem onClick={() => goToProfilePage(authorId)}>
            프로필 보기
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};
