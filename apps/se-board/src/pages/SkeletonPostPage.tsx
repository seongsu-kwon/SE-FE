import { Box, Hide, Show } from "@chakra-ui/react";

import {
  SkeletonDetailPostContent,
  SkeletonDetailPostDesktopHeader,
  SkeletonDetailPostHeader,
} from "@/components/detailPost";

export const SkeletonPostPage = () => {
  return (
    <Box maxW="984px" w="100%">
      <Show above="md">
        <Box pt="0rem">
          <SkeletonDetailPostDesktopHeader />
        </Box>
      </Show>
      <Hide above="md">
        <SkeletonDetailPostHeader />
      </Hide>
      <SkeletonDetailPostContent />
    </Box>
  );
};
