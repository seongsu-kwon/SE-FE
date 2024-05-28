import {
  Button,
  Flex,
  Heading,
  Hide,
  Icon,
  Show,
  Skeleton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsPencilFill } from "react-icons/bs";

import { MobilePostPageBottonMenu } from "@/components";
import { useNavigatePage } from "@/hooks";
import { useMenu } from "@/hooks/useMenu";
import { usePostSearchParams } from "@/hooks/usePostSearchParams";
import { useFetchPostList } from "@/react-query/hooks/usePost";

import { CategoryNavigation } from "./CategoryNavigation";
import { PostList } from "./PostList";
import { PostSearchForm } from "./PostSearchForm";
import { PostTable } from "./PostTable";

export const BoardPage = () => {
  const { goToWritePage } = useNavigatePage();

  const { getCurrentMenu, getCurrentMenuId } = useMenu();
  const { page, searchOption, query } = usePostSearchParams();
  const { postList, totalItems, isLoading } = useFetchPostList({
    categoryId: getCurrentMenuId()!,
    page,
    perPage: 20,
    searchOption,
    query,
  });

  const titleColor = useColorModeValue("gray.7", "whiteAlpha.800");
  const borderColor = useColorModeValue("gray.3", "whiteAlpha.400");

  return (
    <>
      <Show above="md">
        <Stack alignItems="center" maxW="1180px" w="full" px="1rem" py="3rem">
          {/* <----- 게시판 제목과 아이콘 시작 -----> 
          <Flex
            position="relative"
            alignItems="center"
            maxW="container.sm"
            w="full"
            px="2rem"
            py="1.2rem"
            mb="2rem"
          ></Flex>
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
          <----- 게시판 제목과 아이콘 종료 -----> */}
          <Flex justifyContent="space-between" alignItems="center" w="full">
            <Heading fontSize="2xl" pl="1rem" color={titleColor}>
              {getCurrentMenu()?.name}
            </Heading>
            <PostSearchForm />
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            w="full"
            py="0.5rem"
            borderY="1px"
            borderColor={borderColor}
            gap="5rem"
          >
            <CategoryNavigation categoryList={getCurrentMenu()?.subMenu!} />
            <Button
              onClick={goToWritePage}
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
            perPage={40}
            page={page}
          />
        )}
        <MobilePostPageBottonMenu categoryList={getCurrentMenu()?.subMenu!} />
      </Hide>
    </>
  );
};
