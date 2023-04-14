import { Box, Hide, Show } from "@chakra-ui/react";

import {
  CategoryAndPrivacySetting,
  DesktopAnonymousRegister,
  DesktopCategoryAndPrivacySetting,
  DesktopFileUploader,
  MobileFileUploader,
  WritingEditor,
} from "@/components/writing";

interface CategoryOption {
  id: string;
  value: string;
}

const freeCategoryOptions: CategoryOption[] = [
  { id: "general", value: "일반" },
  { id: "QnA", value: "Q&A" },
  { id: "career", value: "진로" },
  { id: "lecture", value: "전공" },
];

export const FreeBoardWrite = () => {
  return (
    <Box>
      <Show above="md">
        <Box mx="auto" maxW="984px">
          <DesktopCategoryAndPrivacySetting
            categoryOptions={freeCategoryOptions}
          />
          <DesktopFileUploader onFileDrop={(file) => console.log(file)} />
        </Box>
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting categoryOptions={freeCategoryOptions} />
        <MobileFileUploader onFileDrop={(file) => console.log(file)} />
      </Hide>
      <WritingEditor />
      <Show above="md">
        <DesktopAnonymousRegister />
      </Show>
    </Box>
  );
};
