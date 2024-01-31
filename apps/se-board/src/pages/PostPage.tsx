import { Box, Hide, Show } from "@chakra-ui/react";
import { ErrorCode } from "@types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CommentSection } from "@/components/comment";
import {
  AttachmentFile,
  Content,
  DesktopHeader,
  Header,
  SkeletonDetailPostContent,
  SkeletonDetailPostDesktopHeader,
  SkeletonDetailPostHeader,
} from "@/components/detailPost";
import { useNavigatePage } from "@/hooks";
import { useGetPostQuery, useSecretPostMutation } from "@/react-query/hooks";
import { useMobileHeaderState } from "@/store/mobileHeaderState";
import { incorrectPostPassword } from "@/utils/errorHandling";
import { convertPostInfo } from "@/utils/postUtils";

import { PageNotFound } from "./PageNotFound";
import { PWInput } from "./SecretPostPWInput";

export const PostPage = () => {
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useGetPostQuery(postId);
  const { mutate, isLoading: secretIsLoading } = useSecretPostMutation();

  const [password, setPassword] = useState<string>("");

  const { mobileHeaderOpen, mobileHeaderClose } = useMobileHeaderState();

  const { goToBackPage } = useNavigatePage();

  let postHeaderInfo = data ? convertPostInfo(data) : undefined;
  let attachemntFileData = data ? data.attachments.fileMetaDataList : undefined;
  let content = data ? data.contents : undefined;

  useEffect(() => {
    mobileHeaderClose();

    return mobileHeaderOpen;
  }, []);

  const onSubmit = () => {
    mutate(
      { postId: Number(postId), password },
      {
        onSuccess: (data) => {
          postHeaderInfo = convertPostInfo(data);
          attachemntFileData = data.attachments.fileMetaDataList;
          content = data.contents;
          setPassword("");
        },
        onError: (error: unknown | ErrorCode) => {
          if (error === 114) {
            incorrectPostPassword();
          }
        },
      }
    );
  };

  if (isError) {
    const { code, message } = error as { code: number; message: string };

    if (code === 113 && !postHeaderInfo) {
      return (
        <PWInput
          password={password}
          handleChange={(e) => setPassword(e.target.value)}
          onSubmit={onSubmit}
        />
      );
    } else {
      alert(message);
      goToBackPage();
    }
  }

  return postHeaderInfo ? (
    <Box maxW="984px" w="100%">
      <Show above="md">
        <Box pt="0rem">
          {isLoading || secretIsLoading ? (
            <SkeletonDetailPostDesktopHeader />
          ) : (
            <DesktopHeader HeadingInfo={postHeaderInfo} />
          )}
        </Box>
      </Show>
      <Hide above="md">
        {isLoading || secretIsLoading ? (
          <SkeletonDetailPostHeader />
        ) : (
          <Header HeadingInfo={postHeaderInfo} />
        )}
      </Hide>
      <AttachmentFile files={attachemntFileData || []} />
      {isLoading || secretIsLoading ? (
        <SkeletonDetailPostContent />
      ) : (
        <Content contents={content || "<p></p>"} />
      )}
      <CommentSection postId={postId} isPostRequestError={!!postHeaderInfo} />
    </Box>
  ) : (
    <PageNotFound />
  );
};
