import {
  Button,
  Flex,
  Heading,
  Hide,
  Icon,
  Img,
  Show,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import NoticeIcon from "@/assets/images/notice_icon.png";
import { MobilePostPageBottonMenu } from "@/components";
import { useMenu } from "@/hooks/useMenu";
import { useFetchPostList } from "@/react-query/hooks/usePost";
import {
  pinedPostListState,
  postListState,
  postPaginationState,
} from "@/store/post";

import { CategoryNavigation } from "./CategoryNavigation";
import { PostList } from "./PostList";
import { PostSearchForm } from "./PostSearchForm";
import { PostTable } from "./PostTable";

export const BoardPage = () => {
  const { currentPage } = useRecoilValue(postPaginationState);
  const postList = useRecoilValue(postListState);
  const pinedPostList = useRecoilValue(pinedPostListState);
  const { getCurrentMenu, getCurrentMenuId } = useMenu();

  const { totalItems, isLoading, onChangePage } = useFetchPostList({
    categoryId: getCurrentMenuId()!,
    perPage: 40,
  });

  const navigate = useNavigate();
  const goWritePage = () => {
    navigate("write");
  };

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
            <Heading fontSize="2rem">{getCurrentMenu()?.name}</Heading>
            <Img
              src={NoticeIcon}
              position="absolute"
              w="6rem"
              right="2rem"
              top="-1.5rem"
            />
          </Flex>
          <Flex justifyContent="flex-end" w="full">
            <PostSearchForm />
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="full"
            py="0.5rem"
            borderY="1px"
            borderColor="gray.3"
            gap="5rem"
          >
            <CategoryNavigation categoryList={getCurrentMenu()?.subMenu!} />
            <Button
              onClick={goWritePage}
              variant="primary"
              leftIcon={<Icon as={BsPencilFill} />}
            >
              글쓰기
            </Button>
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
              data={[...pinedPostList, ...postList]}
              totalItems={totalItems}
              perPage={40}
              onChange={onChangePage}
              page={currentPage}
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
            data={[...pinedPostList, ...postList]}
            totalItems={totalItems}
            perPage={40}
            onChange={onChangePage}
            page={currentPage}
          />
        )}
        <MobilePostPageBottonMenu categoryList={getCurrentMenu()?.subMenu!} />
      </Hide>
    </>
  );
};
