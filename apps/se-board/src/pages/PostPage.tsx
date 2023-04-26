import { Box, Hide, Show } from "@chakra-ui/react";
import { PostDetail } from "@types";
import { useEffect, useState } from "react";
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
import { useGetPostQuery } from "@/react-query/hooks";
import { useMobileHeaderState } from "@/store/mobileHeaderState";

const post = {
  postId: 2234,
  title: "hello SE Board", // header
  author: {
    // header
    login_id: "m1234", //익명 사용자면, anonymous
    name: "min jeong",
  },
  views: 10, // header
  category: {
    // header
    main_category: "notice",
    sub_category: "class",
  },
  created_at: "2022-05-05-12:00:02", // header
  moified_at: "2022-05-06-12:00:01",
  contents: `<div class="document_91563_19198 xe_content"><p>&nbsp;</p>

  <p><span style="font-size:18px;">안녕하십니까&nbsp;클라우드 학생회입니다&nbsp;</span></p>
  
  <p>&nbsp;</p>
  
  <p><span style="font-size:18px;">4월 4일 화요일 19:00 ~ 20:00 DB134에서 4월 미니게임&nbsp;피카츄배구를 진행합니다&nbsp;</span></p>
  
  <p>&nbsp;</p>
  
  <p><span style="font-size:18px;">미니게임&nbsp;</span><span style="font-size:18px;">진행 동안은 DB134 사용이 어려울 예정이니 이점 양해부탁드립니다</span></p></div>`, // contents
  bookmarked: true, // 익명 사용자이면 항상 false // header
  isEditable: true, // 작성자가 익명 사용자면 항상 true, 작성자가 로그인 사용자면, 글 수정/삭제 가능할 시, true // header
  attachment: {}, // file
};

const mainCategories = [
  { eng: "notice", kor: "공지사항", icon: NoticeIcon },
  { eng: "free", kor: "자유게시판", icon: ChatIcon },
  { eng: "archive", kor: "아카이브", icon: "" },
];

const categories = [
  { eng: "class", kor: "학사" },
  { eng: "general", kor: "일반" },
  { eng: "lecture", kor: "강의" },
  { eng: "event", kor: "행사" },
  { eng: "council", kor: "학생회" },
];

const files = [
  {
    file_id: 1,
    file_name: "hello.pdf",
    file_size: 100,
    file_type: "pdf",
    file_url: "https://www.google.com",
  },
  {
    file_id: 2,
    file_name: "hello.pdf",
    file_size: 100,
    file_type: "pdf",
    file_url: "https://www.google.com",
  },
];

export const PostPage = () => {
  const { postId } = useParams();
  const mainCategory = useLocation().pathname.split("/")[1];
  const { data, isLoading, isError, error } = useGetPostQuery(postId);
  const { mobileHeaderOpen, mobileHeaderClose } = useMobileHeaderState();
  const [postData, setPostData] = useState<PostDetail | undefined>(data);

  useEffect(() => {
    mobileHeaderClose();
    setPostData(data);

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
    bookmarked: postData?.bookmarked || false,
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
      <AttachmentFile files={files} />
      {isLoading ? (
        <SkeletonDetailPostContent />
      ) : (
        <Content contents={postData?.contents || "<p>내용 무</p>"} />
      )}

      <CommentSection postId={postId} />
    </Box>
  );
};
