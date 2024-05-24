import {
  Flex,
  Heading,
  Hide,
  Img,
  Show,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import NoticeIcon from "@/assets/images/notice_icon.png";
import { useFetchProfileCommentList } from "@/react-query/hooks/useProfile";

import { CommentList } from "./CommentList";
import { CommentTable } from "./CommentTable";
import { useProfilePostSearchParams } from "./useProfilePostSearchParams";

export const ProfileCommentListPage = () => {
  const { page } = useProfilePostSearchParams();
  const { userId } = useParams();

  const { commentList, isLoading, totalItems } = useFetchProfileCommentList({
    loginId: userId!,
    page,
    perPage: 20,
  });

  return (
    <>
      <Show above="md">
        <Stack alignItems="center" maxW="1180px" w="full" px="1rem" py="3rem">
          <Flex
            position="relative"
            alignItems="center"
            maxW="container.sm"
            w="full"
            px="2rem"
            py="1.2rem"
            mb="2rem"
            bgColor="gray.1"
            borderRadius="0.5rem"
          >
            <Heading fontSize="2rem">작성한 댓글</Heading>
            <Img
              src={NoticeIcon}
              position="absolute"
              w="6rem"
              right="2rem"
              top="-1.5rem"
            />
          </Flex>
          {isLoading ? (
            <Stack w="full">
              {[...new Array(20)].map((_, i) => (
                <Skeleton
                  key={i}
                  height="2.5rem"
                  startColor="gray.1"
                  endColor="gray.3"
                />
              ))}
            </Stack>
          ) : commentList.length === 0 ? (
            <Flex py="8rem" fontSize="1.25rem" fontWeight="bold" color="gray.5">
              게시물이 없습니다
            </Flex>
          ) : (
            <CommentTable
              data={commentList}
              totalItems={totalItems}
              perPage={20}
              page={page}
            />
          )}
        </Stack>
      </Show>
      <Hide above="md">
        {isLoading ? (
          <Stack w="full" py="1rem" mt="56px">
            {[...new Array(20)].map((_, i) => (
              <Skeleton
                key={i}
                height="6rem"
                startColor="gray.1"
                endColor="gray.3"
              />
            ))}
          </Stack>
        ) : commentList.length === 0 ? (
          <Flex
            h="calc(100vh - 56px)"
            alignItems="center"
            fontSize="1.25rem"
            fontWeight="bold"
            color="gray.5"
          >
            게시물이 없습니다
          </Flex>
        ) : (
          <CommentList
            data={commentList}
            totalItems={totalItems}
            perPage={20}
            page={page}
          />
        )}
      </Hide>
    </>
  );
};
