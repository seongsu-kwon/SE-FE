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

const noticeCategoryOptions: CategoryOption[] = [
  { id: "general", value: "일반" },
  { id: "lecture", value: "강의" },
  { id: "bachelor", value: "학사" },
  { id: "event", value: "행사" },
  { id: "studentCouncil", value: "학생회" },
];

export const NoticeWrite = () => {
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
    console.log(modifyPost);
    const { data } = usePutPostMutation(Number(postId), modifyPost);

    resetModifyPost();
  };

  const onClickRegistrationInWrite = () => {};

  return (
    <Box maxW="984px" w="100%" mx="auto">
      <Show above="md">
        <DesktopCategoryAndPrivacySetting
          categoryOptions={noticeCategoryOptions}
          beforeCategory={
            noticeCategoryOptions.find(
              (value) => value.id === beforPost?.category.subCategory
            )?.value
          }
          // beforePrivacy={post?.privacy} 게시글 공개 범위
        />
        <DesktopFileUploader
          onFileDrop={(file) => console.log(file)}
          beforeFiles={beforPost?.attachments}
        />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting
          categoryOptions={noticeCategoryOptions}
          beforeCategory={
            noticeCategoryOptions.find(
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
      <WritingEditor contents={beforPost?.contents} />
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
