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

const NOTICE_CATEGORY_OPTIONS: Array<category_option> = [
  { id: "general", value: "일반" },
  { id: "lecture", value: "강의" },
  { id: "bachelor", value: "학사" },
  { id: "event", value: "행사" },
  { id: "studentCouncil", value: "학생회" },
];

export const NoticeWrite = () => {
  return (
    <Box>
      <Show above="md">
        <DesktopCategoryAndPrivacySetting
          CATEGORY_OPTIONS={NOTICE_CATEGORY_OPTIONS}
        />
        <DesktopFileUploader onFileDrop={(file) => console.log(file)} />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting CATEGORY_OPTIONS={NOTICE_CATEGORY_OPTIONS} />
        <MobileFileUploader onFileDrop={(file) => console.log(file)} />
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
