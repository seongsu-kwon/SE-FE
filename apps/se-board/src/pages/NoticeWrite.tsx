import { Box, Hide, Show } from "@chakra-ui/react";

import {
  CategoryAndPrivacySetting,
  DesktopCategoryAndPrivacySetting,
  DesktopFileUploader,
  MobileFileUploader,
  WritingEditor,
} from "@/components/writing";

export const NoticeWrite = () => {
  return (
    <Box>
      <Show above="md">
        <DesktopCategoryAndPrivacySetting />
        <DesktopFileUploader onFileDrop={(file) => console.log(file)} />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting />
        <MobileFileUploader />
      </Hide>
      <WritingEditor />
    </Box>
  );
};
