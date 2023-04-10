import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import {
  BsArrowReturnRight,
  BsAt,
  BsExclamationCircle,
  BsPencilSquare,
  BsPersonCircle,
  BsTrash3,
} from "react-icons/bs";

import { MoreButton } from "@/components/detailPost";
import { openColors } from "@/styles";

const editMenus = (isEditable: boolean) => {
  return isEditable
    ? [
        {
          name: "수정",
          onClick: () => {},
          isWriter: true,
          icon: BsPencilSquare,
        },
        { name: "삭제", onClick: () => {}, isWriter: true, icon: BsTrash3 },
        {
          name: "신고",
          onClick: () => {},
          isWriter: true,
          icon: BsExclamationCircle,
        },
      ]
    : [
        {
          name: "신고",
          onClick: () => {},
          isWriter: true,
          icon: BsExclamationCircle,
        },
      ];
};

interface CommentProps {
  author: {
    userId: string | null; // loginId로 수정 필요
    name: string;
  };
  contents: string;
  createdAt: string;
  isEditable: boolean;
  tag?: string;
  replyInputRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

export const Comment = ({
  author,
  contents,
  createdAt,
  isEditable,
  tag,
  replyInputRef,
}: CommentProps) => {
  const replyOnClick = () => {
    replyInputRef.current?.focus();

    if (replyInputRef.current) {
      replyInputRef.current.value = `@${author.name} `;
    }
  };

  return author.userId !== null ? ( // loginId로 수정 필요
    <>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" w="fit-content">
          <BsPersonCircle color={openColors.gray[4]} fontSize="32px" />
          <Text px="10px" fontSize={{ base: "lg" }} fontWeight="600">
            {author.name}
          </Text>
        </Box>
        <Box w="fit-content">
          <MoreButton fontSize="24px" menuItems={editMenus(isEditable)} />
        </Box>
      </Box>

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
        <Text mb="-2px" textAlign="left">
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
  ) : (
    <Box display="flex" alignItems="center" justifyContent="center" h="120px">
      <Text fontSize="xl">삭제된 댓글입니다.</Text>
    </Box>
  );
};
