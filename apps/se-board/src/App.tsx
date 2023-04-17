import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainLayout } from "@/components/layouts";
import { ArchiveWrite, FreeBoardWrite, NoticePage, NoticeWrite } from "@/pages";

import { PostPage } from "./pages";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="" element={<MainLayout />}>
        <Route path="" element={<div>메인</div>} />
        <Route path="notice/write" element={<NoticeWrite />} />
        <Route path="notice" element={<NoticePage />} />
        <Route path="free-board" element={<div>자유게시판</div>} />
        <Route path="free-board/write" element={<FreeBoardWrite />} />
        <Route path="archive" element={<div>아카이브</div>} />
        <Route path="archive/write" element={<ArchiveWrite />} />
        <Route path="consulting" element={<div>지도교수 상담 신청</div>} />
        <Route path="recruitment" element={<div>팀모집</div>} />
        <Route
          path="projectroom-reservation"
          element={<div>프로젝트실 예약</div>}
        />
        <Route path="server-rental" element={<div>서버 대여</div>} />

        <Route path="posts/:id" element={<PostPage />} />
      </Route>
      <Route />
    </Routes>
  </BrowserRouter>
);
