import { Box } from "@chakra-ui/react";
import DOMPurify from "dompurify";

import { openColors } from "@/styles";

export const Content = ({ contents }: { contents: string }) => {
  return (
    <Box
      maxW="100%"
      minH="450px"
      mx="auto"
      borderBottom={`1px solid ${openColors.gray[3]}`}
    >
      <Box
        m="16px"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(contents, { ALLOWED_TAGS: ["iframe"] }),
        }}
      />
    </Box>
  );
};
