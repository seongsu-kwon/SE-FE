import { Box, Hide, Show } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

import {
  CategoryAndPrivacySetting,
  DesktopAnonymousRegister,
  DesktopCategoryAndPrivacySetting,
  DesktopFileUploader,
  MobileFileUploader,
  WritingEditor,
} from "@/components/writing";
import { useMenu } from "@/hooks/useMenu";
import { queryClient } from "@/react-query";
import {
  useGetPostQuery,
  usePostPostMutation,
  usePutPostMutation,
} from "@/react-query/hooks";
import { modifyPostState, writePostState } from "@/store";
import { useMobileHeaderState } from "@/store/mobileHeaderState";
import { useUserState } from "@/store/user";
import { errorHandle } from "@/utils/errorHandling";
import { convertModifyPostData, isWritePostActive } from "@/utils/postUtils";

export const NoticeWrite = () => {
  const { postId } = useParams();
  const pathName = useLocation().pathname;
  const menu = useMenu().getCurrentMenu();
  const navigate = useNavigate();
  const { mobileHeaderOpen, mobileHeaderClose } = useMobileHeaderState();

  const [modifyPost, setModifyPost] = useRecoilState(modifyPostState);
  const resetModifyPost = useResetRecoilState(modifyPostState);
  const [writePost, setWritePost] = useRecoilState(writePostState);
  const resetWritePost = useResetRecoilState(writePostState);

  const isModified = useRef(false);

  const { data, isError, error } = useGetPostQuery(
    postId,
    pathName.includes("modify")
  );
  const { mutate: putPostMutate, isLoading: putPostIsLoading } =
    usePutPostMutation();
  const { mutate: writePostMutate, isLoading: writePostIsLoading } =
    usePostPostMutation();

  const { hasAuth } = useUserState();

  useEffect(() => {
    mobileHeaderClose();

    if (!hasAuth) {
      alert("로그인 후 작성해주세요.");
      navigate("/login");
    }

    if (pathName.includes("modify")) {
      isModified.current = true;
    }

    return () => mobileHeaderOpen();
  }, []);

  useEffect(() => {
    if (data) {
      setModifyPost(convertModifyPostData(data));
    }
  }, [data]);

  const onClickRegistrationInModify = () => {
    const correctPost = isWritePostActive(modifyPost, isModified.current);

    if (correctPost !== null) {
      alert(correctPost);
      return;
    }

    putPostMutate(
      { postId: Number(pathName.split("/")[2]), data: modifyPost },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["post", data.id]);

          navigate(`/${menu?.urlId}/${data.id}`, {
            replace: true,
          });

          resetModifyPost();
        },
        onError: (error) => {
          errorHandle(error);
        },
      }
    );
  };

  const onClickRegistrationInWrite = () => {
    const correctPost = isWritePostActive(writePost, isModified.current);

    if (correctPost != null) {
      alert(correctPost);
      return;
    }
    writePostMutate(writePost, {
      onSuccess: (data) => {
        navigate(`/${menu?.urlId}/${data.id}`, {
          replace: true,
        });
        resetWritePost();
      },
      onError: (error) => {
        errorHandle(error);
      },
    });
  };

  if (isError) {
    const { code, message } = error as { code: number; message: string };

    if (code === 113) {
      alert(message);
      window.history.back();
    } else {
      errorHandle(error);
    }
  }

  return (
    <Box maxW="984px" w="100%" pt="56px" mx="auto">
      <Show above="md">
        <DesktopCategoryAndPrivacySetting
          postData={data}
          isModified={isModified.current}
        />
        <DesktopFileUploader
          isModified={isModified.current}
          beforeFiles={data?.attachments.fileMetaDataList || []}
        />
      </Show>
      <Hide above="md">
        <CategoryAndPrivacySetting
          postData={data}
          isModified={isModified.current}
          onClickRegistration={
            isModified.current
              ? onClickRegistrationInModify
              : onClickRegistrationInWrite
          }
        />
        <MobileFileUploader
          isModified={isModified.current}
          beforeFiles={data?.attachments.fileMetaDataList || []}
        />
      </Hide>
      <WritingEditor
        title={data?.title || ""}
        contents={data?.contents || ""}
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
          isLoading={isModified.current ? putPostIsLoading : writePostIsLoading}
        />
      </Show>
    </Box>
  );
};
