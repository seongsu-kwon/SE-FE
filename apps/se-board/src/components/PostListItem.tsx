import {
  Center,
  Flex,
  Heading,
  Icon,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { PostListItem as PostListItemInfo } from "@types";
import { BsLink45Deg, BsPinAngleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { NewIcon } from "@/components/NewIcon";
import { toYYMMDD_DOT } from "@/utils/dateUtils";
import {
  commentsSizeFormat,
  isModified,
  isRecentPost,
} from "@/utils/postUtils";

import { UpdateIcon } from "./UpdateIcon";

interface PostListItemProps extends PostListItemInfo {
  ellipsisLine?: 0 | 1 | 2;
  menuUrlId?: string;
}

export const PostListItem = ({
  postId,
  title,
  author,
  views,
  category,
  createdDateTime,
  modifiedDateTime,
  hasAttachment,
  commentSize,
  pined,
  ellipsisLine = 0,
  menuUrlId,
}: PostListItemProps) => {
  return (
    <ChakraLink
      as={Link}
      to={menuUrlId ? `${menuUrlId}/${postId}` : `${postId}`}
      display="flex"
      alignItems="flex-start"
      p="1rem"
      _hover={{ bgColor: "gray.0", cursor: "pointer" }}
    >
      {pined && <Icon as={BsPinAngleFill} mr="0.5rem" color="primary" />}
      <Flex direction="column" gap="0.5rem" mr="2rem">
        <Heading
          as="h3"
          size="sm"
          noOfLines={ellipsisLine}
          fontWeight={pined ? "black" : "bold"}
          color={pined ? "primary" : "gray.7"}
        >
          [{category.name}] {title}
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
              <Text>{toYYMMDD_DOT(createdDateTime)}</Text>
              {/* {isModified(createdDateTime, modifiedDateTime) && (
                <Text>(수정됨)</Text>
              )} */}
            </Flex>
          </Flex>
          <Flex alignItems="center" columnGap="0.375rem">
            <Flex gap="0.125rem">
              <Text as="span">조회</Text>
              <Text as="span">{views}</Text>
            </Flex>

            {hasAttachment && <Icon as={BsLink45Deg} />}
            {isRecentPost(createdDateTime) ? (
              <NewIcon />
            ) : isModified(createdDateTime, modifiedDateTime) ? (
              <UpdateIcon />
            ) : null}
          </Flex>
        </Flex>
      </Flex>
      <Center
        flexDirection="column"
        p="0.75rem"
        ml="auto"
        bgColor="gray.2"
        rounded="xl"
        whiteSpace="nowrap"
        fontSize="0.875rem"
        fontWeight="bold"
      >
        <Text>댓글</Text>
        <Text>{commentsSizeFormat(commentSize)}</Text>
      </Center>
    </ChakraLink>
  );
};
