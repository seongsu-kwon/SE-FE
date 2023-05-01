import { Box, Hide, Show } from "@chakra-ui/react";
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
import { beforePostState, modifyPostState } from "@/store";
import { useMobileHeaderState } from "@/store/mobileHeaderState";

export const NoticeWrite = () => {
  const pathName = useLocation().pathname;
  const { mobileHeaderOpen, mobileHeaderClose } = useMobileHeaderState();
  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);
  const resetModifyPost = useResetRecoilState(modifyPostState);
  const [beforePost, setBeforePost] = useRecoilState(beforePostState);
  const isModified = useRef(false);
  const {
    mutate,
    isError: putPostIsError,
    isLoading: putPostIsLoading,
    isSuccess: putPostIsSuccess,
  } = usePutPostMutation();
  const {
    data,
    isLoading: getPostIsLoading,
    isError: getPostIsError,
  } = useGetPostQuery(pathName.split("/")[2]);

  useEffect(() => {
    mobileHeaderClose();

    if (pathName.includes("modify")) {
      isModified.current = true;

      setModifyPost({
        title: data?.title || "",
        contents: data?.contents || "",
        categoryId: data?.category?.categoryId || -1,
        pined: data?.pined || false,
        exposeOption: {
          name: data?.exposeType || "",
          password: "",
        },
        attachmentIds:
          data?.attachments.fileMetaDataList.map(
            (attachment) => attachment.fileMetaDataId
          ) || [],
      });

      setBeforePost({
        postId: data?.postId || Number(pathName.split("/")[2]),
        title: data?.title || "",
        contents: data?.contents || "",
        category: data?.category || { categoryId: -1, name: "" },
        exposeType: data?.exposeType || "",
        attachments: {
          fileMetaDataList: data?.attachments.fileMetaDataList || [],
        },
        isPined: data?.pined || false,
      });
    }

    return mobileHeaderOpen;
  }, [data]);

  const onClickRegistrationInModify = () => {
    mutate({ postId: Number(pathName.split("/")[2]), data: modifyPost });

    resetModifyPost();
  };

  const onClickRegistrationInWrite = () => {};

  return (
    <Box maxW="984px" w="100%" mx="auto">
      <Show above="md">
        <DesktopCategoryAndPrivacySetting isModified={isModified.current} />
        <DesktopFileUploader
          onFileDrop={(file) => console.log(file)}
          beforeFiles={beforePost?.attachments.fileMetaDataList}
        />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting
          isModified={isModified.current}
          onClickRegistration={
            isModified
              ? onClickRegistrationInModify
              : onClickRegistrationInWrite
          }
        />
        <MobileFileUploader
          onFileDrop={(file) => console.log(file)}
          beforeFiles={beforePost?.attachments.fileMetaDataList}
        />
      </Hide>
      <WritingEditor
        title={beforePost?.title}
        contents={beforePost?.contents}
      />
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
