import { Box, Hide, Show } from "@chakra-ui/react";
import { PostDetail } from "@types";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

import {
  CategoryAndPrivacySetting,
  DesktopAnonymousRegister,
  DesktopCategoryAndPrivacySetting,
  DesktopFileUploader,
  MobileFileUploader,
  WritingEditor,
} from "@/components/writing";
import { useGetPostQuery, usePutPostMutation } from "@/react-query/hooks";
import { modifyPostState } from "@/store";
import { useMobileHeaderState } from "@/store/mobileHeaderState";

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
  const pathName = useLocation().pathname;
  const { mobileHeaderOpen, mobileHeaderClose } = useMobileHeaderState();
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);
  const resetModifyPost = useResetRecoilState(modifyPostState);
  const isModified = useRef(false);

  const postId = pathName.split("/")[2];
  let beforPost: PostDetail | undefined = undefined;

  if (pathName.includes("modify")) {
    isModified.current = true;

    const { data, isLoading, isError } = useGetPostQuery(postId);

    beforPost = data;
  }

  useEffect(() => {
    mobileHeaderClose();
    return mobileHeaderOpen;
  }, []);

  const onClickRegistrationInModify = () => {
    const { data } = usePutPostMutation(Number(postId), modifyPost);
    resetModifyPost();
  };

  const onClickRegistrationInWrite = () => {};

  return (
    <Box mx="auto" maxW="984px" w="100%">
      <Show above="md">
        <DesktopCategoryAndPrivacySetting
          categoryOptions={freeCategoryOptions}
          beforeCategory={
            freeCategoryOptions.find(
              (value) => value.id === beforPost?.category.subCategory
            )?.value
          }
        />
        <DesktopFileUploader
          onFileDrop={(file) => console.log(file)}
          beforeFiles={beforPost?.attachments}
        />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting
          categoryOptions={freeCategoryOptions}
          beforeCategory={
            freeCategoryOptions.find(
              (value) => value.id === beforPost?.category.subCategory
            )?.value
          }
          isModified={isModified.current}
          onClickRegistration={
            isModified
              ? onClickRegistrationInModify
              : onClickRegistrationInWrite
          }
        />
        <MobileFileUploader
          onFileDrop={(file) => console.log(file)}
          beforeFiles={beforPost?.attachments}
        />
      </Hide>
      <WritingEditor />
      <Show above="md">
        <DesktopAnonymousRegister
          isModified={isModified.current}
          onClickRegistration={
            isModified
              ? onClickRegistrationInModify
              : onClickRegistrationInWrite
          }
        />
      </Show>
    </Box>
  );
};
