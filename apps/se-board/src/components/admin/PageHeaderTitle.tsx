import { Box, Heading } from "@chakra-ui/react";

import { openColors } from "@/styles";

export const PageHeaderTitle = ({ title }: { title: string }) => {
  return (
    <Box my="24px" borderBottom={`2px solid ${openColors.gray[7]}`}>
      <Heading as="h2" size={{ base: "lg", md: "xl" }}>
        {title}
      </Heading>
    </Box>
  );
};
