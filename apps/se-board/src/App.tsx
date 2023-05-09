import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MainLayout } from "@/components/layouts";
import {
  LoginPage,
  NoticePage,
  NoticeWrite,
  OAuthSignupPage,
  PostPage,
  SignupCompletePage,
  SignupPage,
} from "@/pages";

import { getStoredRefreshToken } from "./api/storage";
import { useReissueToken } from "./react-query/hooks/auth";

export const App = () => {
  const { mutate: reissue } = useReissueToken();

  useEffect(() => {
    if (getStoredRefreshToken()) reissue();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainLayout />}>
          <Route path="" element={<div>메인</div>} />
          <Route path="notice/write" element={<NoticeWrite />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="free-board" element={<div>자유게시판</div>} />
          <Route path="free-board/write" element={<NoticeWrite />} />
          <Route path="archive" element={<div>아카이브</div>} />
          <Route path="archive/write" element={<NoticeWrite />} />
          <Route path="consulting" element={<div>지도교수 상담 신청</div>} />
          <Route path="recruitment" element={<div>팀모집</div>} />
          <Route
            path="projectroom-reservation"
            element={<div>프로젝트실 예약</div>}
          />
          <Route path="server-rental" element={<div>서버 대여</div>} />

          <Route path="notice/:id" element={<PostPage />} />
          <Route path="notice/:postId/modify" element={<NoticeWrite />} />
        </Route>
        <Route />
        <Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signup/oauth" element={<OAuthSignupPage />} />
          <Route path="signup/complete" element={<SignupCompletePage />} />
        </Route>
        <Route />
      </Routes>
    </BrowserRouter>
  );
};
