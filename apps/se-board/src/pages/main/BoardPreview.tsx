import { Divider, Flex, Heading, Img, Skeleton, Stack } from "@chakra-ui/react";
import { PostListItem as PostListItemInfo } from "@types";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import NoticeIcon from "@/assets/images/notice_icon.png";
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
        bgColor="gray.1"
        borderRadius="0.5rem"
        _hover={{ cursor: "pointer" }}
      >
        <Heading fontSize={{ base: "1.5rem", md: "2rem" }}>{menuName}</Heading>
        <Img
          src={NoticeIcon}
          position="absolute"
          w={{ base: "5rem", md: "6rem" }}
          right={{ base: "1rem", md: "2rem" }}
          top="-1.5rem"
        />
      </Flex>
      <Flex direction="column" w="full">
        <Divider />

        {posts.map((post) => (
          <Fragment key={post.postId}>
            <PostListItem ellipsisLine={2} menuUrlId={menuUrlId} {...post} />
            <Divider />
          </Fragment>
        ))}
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
