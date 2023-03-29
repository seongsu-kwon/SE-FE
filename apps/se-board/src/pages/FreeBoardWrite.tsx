import { Box, Hide, Show } from "@chakra-ui/react";

import {
  CategoryAndPrivacySetting,
  DesktopAnonymousRegister,
  DesktopCategoryAndPrivacySetting,
  DesktopFileUploader,
  MobileAnonymousRegister,
  MobileFileUploader,
  WritingEditor,
} from "@/components/writing";

interface category_option {
  id: string;
  value: string;
}

const FREE_CATEGORY_OPTIONS: Array<category_option> = [
  { id: "general", value: "일반" },
  { id: "QnA", value: "Q&A" },
  { id: "career", value: "진로" },
  { id: "lecture", value: "전공" },
];

export const FreeBoardWrite = () => {
  return (
    <Box>
      <Show above="md">
        <DesktopCategoryAndPrivacySetting
          CATEGORY_OPTIONS={FREE_CATEGORY_OPTIONS}
        />
        <DesktopFileUploader onFileDrop={(file) => console.log(file)} />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting CATEGORY_OPTIONS={FREE_CATEGORY_OPTIONS} />
        <MobileFileUploader />
      </Hide>
      <WritingEditor />
      <Show above="md">
        <DesktopAnonymousRegister />
      </Show>
      <Hide above="md">
        <MobileAnonymousRegister />
      </Hide>
    </Box>
  );
};
