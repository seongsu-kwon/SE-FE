import { Box, Hide, Show } from "@chakra-ui/react";
import { PostDetail } from "@types";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import ChatIcon from "@/assets/images/chat_icon.png";
import NoticeIcon from "@/assets/images/notice_icon.png";
import { PostIllustration } from "@/components";
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
import { useGetPostQuery, useSecretPostMutation } from "@/react-query/hooks";
import { useMobileHeaderState } from "@/store/mobileHeaderState";
import { errorHandle } from "@/utils/errorHandling";

import { PWInput } from "./SecretPostPWInput";

const mainCategories = [
  { eng: "notice", kor: "공지사항", icon: NoticeIcon },
  { eng: "free", kor: "자유게시판", icon: ChatIcon },
  { eng: "archive", kor: "아카이브", icon: "" },
];

export const PostPage = () => {
  const { postId } = useParams();
  const mainCategory = useLocation().pathname.split("/")[1];

  const [enabledOption, setEnabledOption] = useState<boolean>(false);
  const { data, isLoading, isError, error } = useGetPostQuery(
    postId,
    enabledOption
  );
  const { mobileHeaderOpen, mobileHeaderClose } = useMobileHeaderState();
  const [postData, setPostData] = useState<PostDetail | undefined>(data);
  const [password, setPassword] = useState<string>("");

  const { mutate } = useSecretPostMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    mutate(
      { postId: Number(postId), password },
      {
        onSuccess: (data) => {
          setPostData(data);
        },
        onError: (error) => {
          errorHandle(error);
        },
      }
    );
  };

  if (isError) {
    const { code } = error as { code: number; message: string };

    if (code === 113) {
      // 비밀글
      return (
        <PWInput
          password={password}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
      );
    }
    errorHandle(error);
  }

  useEffect(() => {
    mobileHeaderClose();
    setPostData(data);
    setEnabledOption(true);

    return mobileHeaderOpen;
  }, [data]);

  const headerInfo = {
    postId: Number(postId),
    title: postData?.title || "제목",
    author: {
      loginId: postData?.author.loginId || "",
      name: postData?.author.name || "이름",
    },
    views: postData?.views || 0,
    category: postData?.category.name || "카테고리",
    createdAt: postData?.createdAt,
    modifiedAt: postData?.modifiedAt,
    bookmarked: postData?.isBookmarked || false,
    isEditable: postData?.isEditable || false,
  };

  return (
    <Box maxW="984px" w="100%">
      <Show above="md">
        <Box pt="3rem">
          <PostIllustration
            title={"공지사항"}
            imgSrc={
              mainCategories.find((category) => category.eng === mainCategory)
                ?.icon || ""
            }
          />
          {isLoading ? (
            <SkeletonDetailPostDesktopHeader />
          ) : (
            <DesktopHeader HeadingInfo={headerInfo} />
          )}
        </Box>
      </Show>
      <Hide above="md">
        {isLoading ? (
          <SkeletonDetailPostHeader />
        ) : (
          <Header HeadingInfo={headerInfo} />
        )}
      </Hide>
      <AttachmentFile files={postData?.attachments.fileMetaDataList || []} />
      {isLoading ? (
        <SkeletonDetailPostContent />
      ) : (
        <Content contents={postData?.contents || "<p>내용 무</p>"} />
      )}

      <CommentSection postId={postId} />
    </Box>
  );
};
