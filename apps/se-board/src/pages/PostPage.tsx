import { Box, Hide, Show } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { CommentSection } from "@/components/comment";
import {
  AttachmentFile,
  Content,
  DesktopHeader,
  Header,
} from "@/components/detailPost";

const post = {
  post_id: 2234,
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
  bookmarked: false, // 익명 사용자이면 항상 false // header
  isEditalbe: false, // 작성자가 익명 사용자면 항상 true, 작성자가 로그인 사용자면, 글 수정/삭제 가능할 시, true // header
  attachment: {}, // file
};

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
  const { postId } = useParams<{ postId: string }>();

  const headerInfo = {
    title: post.title,
    author: { login_id: post.author.login_id, name: post.author.name },
    views: post.views,
    category: {
      main_category: post.category.main_category,
      sub_category:
        categories.find(
          (category) => category.eng === post.category.sub_category
        )?.kor || "",
    },
    created_at: post.created_at,
    bookmarked: post.bookmarked,
    isEditalbe: post.isEditalbe,
  };

  return (
    <Box>
      <Show above="md">
        <DesktopHeader HeadingInfo={headerInfo} />
      </Show>
      <Hide above="md">
        <Header HeadingInfo={headerInfo} />
      </Hide>
      <AttachmentFile files={files} />
      <Content contents={post.contents} />
      <CommentSection postId={postId} />
    </Box>
  );
};
