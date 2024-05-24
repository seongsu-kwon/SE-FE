import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userState } from "@/store/user";

export const useNavigatePage = () => {
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  return {
    goToLoginPage: () => navigate("/login"),
    goToMainPage: () => navigate("/"),
    goToWritePage: () => navigate("write"),
    goToMyPage: () => navigate(`/profile/${userInfo.userId}`),
    goToProfilePage: (email: string | null) => {
      if (email === null) alert("존재하지 않는 사용자입니다.");

      navigate(`/profile/${email}`);
    },
    goToBackPage: () => navigate(-1),
  };
};
