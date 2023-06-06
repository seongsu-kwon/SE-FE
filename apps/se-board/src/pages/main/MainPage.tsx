import { Flex, SimpleGrid, Stack } from "@chakra-ui/react";

import { convertPostListItemDTOToPostListItem } from "@/api/post";
import { useMainPageMenu } from "@/react-query/hooks/useMainPage";

import { BoardPreview } from "./BoardPreview";

export const MainPage = () => {
  const { data, isLoading } = useMainPageMenu();
  return (
    <>
      <Stack
        alignItems="center"
        maxW={{ base: "100%", md: "1180px" }}
        w="full"
        px="1rem"
        py={{ base: "calc(56px + 3rem)", md: "3rem" }}
      >
        <Flex alignItems="center" w="full">
          <SimpleGrid
            w="full"
            columns={{ base: 1, md: 2 }}
            spacingX="2rem"
            spacingY="4rem"
          >
            {data?.data.map((menu, i) => (
              <BoardPreview
                key={i}
                menuName={menu.menuName}
                menuUrlId={menu.urlId}
                posts={menu.posts.content
                  .map((v) => convertPostListItemDTOToPostListItem(v))
                  .map((v) => ({ ...v, pined: false }))}
              />
            ))}
          </SimpleGrid>
        </Flex>
      </Stack>
    </>
  );
};
