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

const noticeCategoryOptions: CategoryOption[] = [
  { id: "general", value: "일반" },
  { id: "lecture", value: "강의" },
  { id: "bachelor", value: "학사" },
  { id: "event", value: "행사" },
  { id: "studentCouncil", value: "학생회" },
];

export const NoticeWrite = () => {
  return (
    <Box maxW="984px" mx="auto">
      <Show above="md">
        <DesktopCategoryAndPrivacySetting
          categoryOptions={noticeCategoryOptions}
        />
        <DesktopFileUploader onFileDrop={(file) => console.log(file)} />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting categoryOptions={noticeCategoryOptions} />
        <MobileFileUploader onFileDrop={(file) => console.log(file)} />
      </Hide>
      <WritingEditor />
      <Show above="md">
        <DesktopAnonymousRegister />
      </Show>
    </Box>
  );
};
