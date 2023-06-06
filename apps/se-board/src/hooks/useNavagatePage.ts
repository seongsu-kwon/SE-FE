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
    goToMyPage: () => navigate(`/profile/${userInfo.email}`),
  };
};
