import { Hide, Show } from "@chakra-ui/react";

import {
  CategoryAndPrivacySetting,
  DesktopCategoryAndPrivacySetting,
} from "@/components/writing";

export const NoticeWrite = () => {
  return (
    <div>
      <Show above="md">
        <DesktopCategoryAndPrivacySetting />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting />
      </Hide>
    </div>
  );
};
