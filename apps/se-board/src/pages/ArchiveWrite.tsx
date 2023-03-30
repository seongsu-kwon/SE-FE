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

const Archive_CATEGORY_OPTIONS: Array<category_option> = [
  { id: "bachelor", value: "학사" },
];

export const ArchiveWrite = () => {
  return (
    <Box>
      <Show above="md">
        <DesktopCategoryAndPrivacySetting
          CATEGORY_OPTIONS={Archive_CATEGORY_OPTIONS}
        />
        <DesktopFileUploader onFileDrop={(file) => console.log(file)} />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting
          CATEGORY_OPTIONS={Archive_CATEGORY_OPTIONS}
        />
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
