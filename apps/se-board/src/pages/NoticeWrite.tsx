import { Hide, Show } from "@chakra-ui/react";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import Editor from "ckeditor5-custom-build/build/ckeditor";
import {
  CategoryAndPrivacySetting,
  DesktopCategoryAndPrivacySetting,
  DesktopFileUploader,
  MobileFileUploader,
} from "@/components/writing";

export const NoticeWrite = () => {
  return (
    <div>
      <Show above="md">
        <DesktopCategoryAndPrivacySetting />
        <DesktopFileUploader onFileDrop={(file) => console.log(file)} />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting />
        <MobileFileUploader />
      </Hide>
      {/* <CKEditor editor={Editor} data="<p>Hello from CKEditor 5!</p>" /> */}
    </div>
  );
};
