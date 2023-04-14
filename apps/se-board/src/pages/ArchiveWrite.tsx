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

const achiveCategoryOptions: CategoryOption[] = [
  { id: "bachelor", value: "학사" },
];

export const ArchiveWrite = () => {
  return (
    <Box>
      <Show above="md">
        <Box mx="auto" maxW="984px">
          <DesktopCategoryAndPrivacySetting
            categoryOptions={achiveCategoryOptions}
          />
          <DesktopFileUploader onFileDrop={(file) => console.log(file)} />
        </Box>
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting categoryOptions={achiveCategoryOptions} />
        <MobileFileUploader onFileDrop={(file) => console.log(file)} />
      </Hide>
      <WritingEditor />
      <Show above="md">
        <DesktopAnonymousRegister />
      </Show>
    </Box>
  );
};
