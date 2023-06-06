import { Flex, Heading, Text } from "@chakra-ui/react";
import { CommentListItemDTO } from "@types";
import { useNavigate } from "react-router-dom";

import { toYYMMDD_DOT } from "@/utils/dateUtils";
import { isModified } from "@/utils/postUtils";

interface PostListItemProps extends CommentListItemDTO {
  ellipsisLine?: 0 | 1 | 2;
}

export const CommentListItem = ({
  contents,
  commentId,
  postId,
  author,
  createdAt,
  modifiedAt,
  ellipsisLine = 0,
}: PostListItemProps) => {
  const navigate = useNavigate();
  const goDetailPost = () => navigate(`/posts/${postId}`);
  return (
    <Flex
      onClick={goDetailPost}
      alignItems="flex-start"
      p="1rem"
      _hover={{ bgColor: "gray.0" }}
    >
      <Flex direction="column" gap="0.5rem" mr="2rem">
        <Heading
          as="h3"
          size="sm"
          noOfLines={ellipsisLine}
          fontWeight="bold"
          color="gray.7"
        >
          {contents}
        </Heading>
        <Flex
          alignItems="center"
          columnGap="0.375rem"
          fontSize="sm"
          flexWrap="wrap"
        >
          <Flex alignItems="center" columnGap="0.375rem">
            <Text>{author.name}</Text>
            <Flex>
              <Text>{toYYMMDD_DOT(createdAt)}</Text>
              {isModified(createdAt, modifiedAt) && <Text>(수정됨)</Text>}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
