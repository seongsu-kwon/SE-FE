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
import { subCommentInfoType } from "@types";
import React, { useState } from "react";
import { BsArrowReturnRight, BsAt, BsPersonCircle } from "react-icons/bs";

import { SubCommentInput } from "@/components/comment";
import { CommentMoreButton } from "@/components/detailPost";
import { openColors } from "@/styles";

const AuthorInfoMenuList = ({ name }: { name: string }) => {
  return (
    <Menu autoSelect={false}>
      <MenuButton>
        <Box display="flex" alignItems="center" w="fit-content">
          <Icon
            as={BsPersonCircle}
            boxSize="32px"
            color={openColors.gray[4]}
            my="auto"
          />
          <Text px="10px" fontSize="lg" fontWeight="600" whiteSpace="nowrap">
            {name}
          </Text>
        </Box>
      </MenuButton>
      <MenuList>
        <MenuItem>작성글 보기</MenuItem>
      </MenuList>
    </Menu>
  );
};

interface CommentContentProps {
  superCommentId: number;
  commentId: number;
  author: {
    userId: string | null; // loginId로 수정 필요
    name: string;
  };
  contents: string;
  createdAt: string;
  isEditable: boolean;
  tag?: string;
  setIsWriteSubComment: React.Dispatch<React.SetStateAction<boolean>>;
  setSubCommentInfo: React.Dispatch<React.SetStateAction<subCommentInfoType>>;
}

export const CommentContent = ({
  superCommentId,
  commentId,
  author,
  contents,
  createdAt,
  isEditable,
  tag,
  setIsWriteSubComment,
  setSubCommentInfo,
}: CommentContentProps) => {
  const [isModify, setIsModify] = useState(false); // 수정 하기 버튼 클릭 시 true

  const replyOnClick = () => {
    setSubCommentInfo({
      superCommentId: superCommentId,
      tagCommentId: commentId,
      tagCommentAuthorName: author.name,
    });

    setIsWriteSubComment(true);
  };

  return author.userId !== null ? ( // loginId로 수정 필요
    <>
      <Box display="flex" justifyContent="space-between">
        <AuthorInfoMenuList name={author.name} />
        <Box w="fit-content">
          <CommentMoreButton
            isEditable={isEditable}
            setIsModify={setIsModify}
          />
        </Box>
      </Box>
      {isModify ? (
        <SubCommentInput
          superCommentId={superCommentId}
          tagCommentId={commentId}
          tagCommentAuthorName={tag}
          setIsWriteSubComment={setIsWriteSubComment}
          contents={contents}
          setIsModify={setIsModify}
        />
      ) : (
        <>
          <Box display="inline-block" w="100%" mt="8px">
            {tag && (
              <Box
                display="flex"
                alignItems="center"
                textAlign="center"
                w="fit-content"
                mr="6px"
                mb="-2px"
                p="1px 4px"
                bgColor={openColors.blue[1]}
                color={openColors.blue[7]}
                borderRadius="10px"
                float="left"
              >
                <BsAt fontSize="18px" />
                <Text whiteSpace="nowrap">{tag}</Text>
              </Box>
            )}
            <Text mb="-2px" textAlign="left" maxW="850px">
              {contents}
            </Text>
          </Box>
          <Box mt="2px">
            <Text textAlign="left" fontSize={{ base: "sm" }} fontWeight="400">
              {createdAt
                .replace("-", ".")
                .replace("-", ".")
                .replace("-", " ")
                .slice(0, 16)}
            </Text>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            mt="12px"
            w="fit-content"
            color={openColors.gray[5]}
          >
            <Button
              size="sm"
              p="0"
              leftIcon={<BsArrowReturnRight />}
              variant="ghost"
              _hover={{ bgColor: openColors.white }}
              onClick={replyOnClick}
            >
              답글 작성
            </Button>
          </Box>
        </>
      )}
    </>
  ) : (
    <Box display="flex" alignItems="center" justifyContent="center" h="120px">
      <Text fontSize="xl">삭제된 댓글입니다.</Text>
    </Box>
  );
};
