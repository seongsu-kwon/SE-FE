import { useNavigate } from "react-router-dom";

export const useNavigatePage = () => {
  const navigate = useNavigate();
  return {
    goToLoginPage: () => navigate("/login"),
  };
};
