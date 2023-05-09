import { Box, Hide, Show } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

import {
  CategoryAndPrivacySetting,
  DesktopAnonymousRegister,
  DesktopCategoryAndPrivacySetting,
  DesktopFileUploader,
  MobileFileUploader,
  WritingEditor,
} from "@/components/writing";
import {
  useGetPostQuery,
  usePostPostMutation,
  usePutPostMutation,
} from "@/react-query/hooks";
import { beforePostState, modifyPostState, writePostState } from "@/store";
import { useMobileHeaderState } from "@/store/mobileHeaderState";
import { errorHandle } from "@/utils/errorHandling";

export const NoticeWrite = () => {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const { mobileHeaderOpen, mobileHeaderClose } = useMobileHeaderState();

  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);
  const resetModifyPost = useResetRecoilState(modifyPostState);
  const [writePost, setWritePost] = useRecoilState(writePostState);
  const resetWritePost = useResetRecoilState(writePostState);
  const [beforePost, setBeforePost] = useRecoilState(beforePostState);

  const isModified = useRef(false);

  const {
    mutate: putPostMutate,
    isError: putPostIsError,
    isLoading: putPostIsLoading,
    isSuccess: putPostIsSuccess,
    error: putPostError,
    data: putPostData,
  } = usePutPostMutation();
  const {
    data,
    isLoading: getPostIsLoading,
    isError: getPostIsError,
    error: getPostError,
  } = useGetPostQuery(pathName.split("/")[2], isModified.current);
  const {
    mutate: writePostMutate,
    isError: writePostIsError,
    isLoading: writePostIsLoading,
    isSuccess: writePostIsSuccess,
    error: writePostError,
    data: writePostData,
  } = usePostPostMutation();

  useEffect(() => {
    mobileHeaderClose();

    if (getPostIsError) {
      return errorHandle(getPostError);
    }

    if (putPostIsError) {
      return errorHandle(putPostError);
    }

    if (writePostIsError) {
      return errorHandle(writePostError);
    }

    if (pathName.includes("modify")) {
      isModified.current = true;

      setModifyPost({
        title: data?.title || "",
        contents: data?.contents || "",
        categoryId: data?.category?.categoryId || -1,
        pined: data?.isPined || false,
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
        isPined: data?.isPined || false,
      });
    }

    return mobileHeaderOpen;
  }, [data]);

  const onClickRegistrationInModify = () => {
    putPostMutate({ postId: Number(pathName.split("/")[2]), data: modifyPost });

    if (putPostIsSuccess) {
      navigate(`/post/${putPostData.id}`, { replace: true });
      resetModifyPost();
    }
  };

  const onClickRegistrationInWrite = () => {
    writePostMutate(writePost);

    if (writePostIsSuccess) {
      navigate(`/post/${writePostData.id}`, { replace: true });
      resetWritePost();
    }
  };

  return (
    <Box maxW="984px" w="100%" mx="auto">
      <Show above="md">
        <DesktopCategoryAndPrivacySetting isModified={isModified.current} />
        <DesktopFileUploader
          isModified={isModified.current}
          beforeFiles={beforePost?.attachments.fileMetaDataList}
        />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting
          isModified={isModified.current}
          onClickRegistration={
            isModified.current
              ? onClickRegistrationInModify
              : onClickRegistrationInWrite
          }
        />
        <MobileFileUploader
          isModified={isModified.current}
          beforeFiles={beforePost?.attachments.fileMetaDataList}
        />
      </Hide>
      <WritingEditor
        title={beforePost?.title}
        contents={beforePost?.contents}
        isModified={isModified.current}
      />
      <Show above="md">
        <DesktopAnonymousRegister
          isModified={isModified.current}
          onClickRegistration={
            isModified.current
              ? onClickRegistrationInModify
              : onClickRegistrationInWrite
          }
        />
      </Show>
    </Box>
  );
};
