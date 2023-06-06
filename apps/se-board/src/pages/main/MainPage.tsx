import { Flex, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

import { convertPostListItemDTOToPostListItem } from "@/api/post";
import { useMainPageMenu } from "@/react-query/hooks/useMainPage";
import { useFetchBanners } from "@/react-query/hooks/useMenu";

import { BoardPreview, BoardPreviewSkeleton } from "./BoardPreview";
import { Carousel } from "./Carousel";

export const MainPage = () => {
  const { data, isLoading } = useMainPageMenu();
  const { data: bannerResponse, isLoading: bannerLoading } = useFetchBanners();
  return (
    <>
      <Stack
        alignItems="center"
        maxW={{ base: "100%", md: "1180px" }}
        w="full"
        px="1rem"
        py={{ base: "calc(56px + 1rem)", md: "1rem" }}
      >
        <Flex
          w={{ base: "full", md: "container.md" }}
          h={{ base: "8rem", sm: "9rem", md: "10rem", lg: "11rem" }}
          mb={{ base: "1rem", md: "2rem" }}
        >
          {bannerLoading ? (
            <Skeleton w="full" h="full" />
          ) : (
            <Carousel banners={bannerResponse?.data || []} />
          )}
        </Flex>
        <Flex alignItems="center" w="full">
          <SimpleGrid
            w="full"
            columns={{ base: 1, md: 2 }}
            spacingX="2rem"
            spacingY="4rem"
          >
            {isLoading && (
              <>
                <BoardPreviewSkeleton />
                <BoardPreviewSkeleton />
              </>
            )}

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
