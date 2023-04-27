import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

import { openColors } from "@/styles";

export const SkeletonComment = () => {
  return (
    <Box
      borderTop={{ md: `1px solid ${openColors.gray[3]}` }}
      py={{ base: "8px", md: "0" }}
    >
      <Box
        my="4px"
        w="100%"
        bg="white"
        p="16px"
        borderBottom={`1px solid ${openColors.gray[3]}`}
      >
        <Box display="flex" alignItems="center">
          <SkeletonCircle size="40px" />
          <Skeleton height="24px" w="120px" ml="10px" />
        </Box>
        <SkeletonText
          mt="20px"
          noOfLines={3}
          spacing="2"
          skeletonHeight="16px"
        />
      </Box>
      <Box
        my="4px"
        w="100%"
        bg="white"
        p="16px"
        pl={{ base: "36px", md: "64px" }}
        borderBottom={`1px solid ${openColors.gray[3]}`}
      >
        <Box display="flex" alignItems="center">
          <SkeletonCircle size="40px" />
          <Skeleton height="24px" w="120px" ml="10px" />
        </Box>
        <SkeletonText
          mt="20px"
          noOfLines={3}
          spacing="2"
          skeletonHeight="16px"
        />
      </Box>
      <Box
        my="4px"
        w="100%"
        bg="white"
        p="16px"
        pl={{ base: "36px", md: "64px" }}
        borderBottom={`1px solid ${openColors.gray[3]}`}
      >
        <Box display="flex" alignItems="center">
          <SkeletonCircle size="40px" />
          <Skeleton height="24px" w="120px" ml="10px" />
        </Box>
        <SkeletonText
          mt="20px"
          noOfLines={3}
          spacing="2"
          skeletonHeight="16px"
        />
      </Box>
    </Box>
  );
};
