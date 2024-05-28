import {
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PostListItem as PostListItemInfo } from "@types";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { PostListItem } from "@/components";

interface BoardPreviewProps {
  menuName: string;
  menuUrlId: string;
  posts: PostListItemInfo[];
}

export const BoardPreview = ({
  menuName,
  menuUrlId,
  posts,
}: BoardPreviewProps) => {
  const navigate = useNavigate();
  const headingBgColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const headingColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

  return (
    <Stack w="full">
      <Flex
        onClick={() => navigate(menuUrlId)}
        position="relative"
        alignItems="center"
        w="full"
        px={{ base: "1rem", md: "2rem" }}
        py={{ base: "1rem", md: "1.2rem" }}
        mb={{ base: "1rem", md: "2rem" }}
        bgColor={headingBgColor}
        borderRadius="0.5rem"
        _hover={{ cursor: "pointer" }}
      >
        <Heading fontSize={{ base: "1.5rem", md: "2rem" }} color={headingColor}>
          {menuName}
        </Heading>
        {/* <Img
          src={NoticeIcon}
          position="absolute"
          w={{ base: "5rem", md: "6rem" }}
          right={{ base: "1rem", md: "2rem" }}
          top="-1.5rem"
        /> */}
      </Flex>
      <Flex direction="column" w="full">
        {posts.length === 0 ? (
          <EmptyPost />
        ) : (
          <>
            <Divider />
            {posts.map((post) => (
              <Fragment key={post.postId}>
                <PostListItem
                  ellipsisLine={2}
                  menuUrlId={menuUrlId}
                  {...post}
                />
                <Divider />
              </Fragment>
            ))}
          </>
        )}
      </Flex>
    </Stack>
  );
};

export const BoardPreviewSkeleton = () => {
  return (
    <Stack w="full">
      <Skeleton
        w="full"
        h="4.5rem"
        mb={{ base: "1rem", md: "2rem" }}
      ></Skeleton>
      <Skeleton w="full" h="5rem" />
      <Skeleton w="full" h="5rem" />
      <Skeleton w="full" h="5rem" />
      <Skeleton w="full" h="5rem" />
      <Skeleton w="full" h="5rem" />
    </Stack>
  );
};

const EmptyPost = () => {
  return (
    <Flex w="full" h="10rem" alignItems="center" justify="center">
      <Text>게시글이 없습니다</Text>
    </Flex>
  );
};
