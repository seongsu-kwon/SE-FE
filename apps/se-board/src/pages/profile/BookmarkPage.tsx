import {
  Flex,
  Heading,
  Hide,
  Img,
  Show,
  Skeleton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import NoticeIcon from "@/assets/images/notice_icon.png";
import { useFetchBookmarkList } from "@/react-query/hooks/useProfile";
import { userState } from "@/store/user";

import { PostList } from "../board/PostList";
import { PostTable } from "../board/PostTable";
import { useProfilePostSearchParams } from "./useProfilePostSearchParams";

export const BookmarkPage = () => {
  const userInfo = useRecoilValue(userState);
  const { page } = useProfilePostSearchParams();
  const { userId } = useParams();

  const { postList, isLoading, totalItems, onChangePage } =
    useFetchBookmarkList({
      userId: userInfo.userId,
      page,
      perPage: 20,
    });

  const headingBgColor = useColorModeValue("gray.1", "whiteAlpha.200");
  const headingColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

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
            bgColor={headingBgColor}
            borderRadius="0.5rem"
          >
            <Heading fontSize="2rem" color={headingColor}>
              북마크
            </Heading>
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
          ) : postList.length === 0 ? (
            <Flex py="8rem" fontSize="1.25rem" fontWeight="bold" color="gray.5">
              게시물이 없습니다
            </Flex>
          ) : (
            <PostTable
              data={postList}
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
        ) : postList.length === 0 ? (
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
          <PostList
            data={postList}
            totalItems={totalItems}
            perPage={20}
            page={page}
          />
        )}
      </Hide>
    </>
  );
};
