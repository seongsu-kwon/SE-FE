import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  changePasswordWithoutLogin,
  checkPasswordChangeAuthCode,
  requestPasswordChangeEmailAuthCode,
} from "@/api/passwordChangeWithoutLogin";

export const useChangePasswordWithoutLogin = () => {
  const navigate = useNavigate();

  const emailAuthCodeMutation = useMutation((email: string) =>
    requestPasswordChangeEmailAuthCode(email)
  );

  const checkAuthCodeMutation = useMutation(
    (data: { email: string; authToken: string }) =>
      checkPasswordChangeAuthCode(data)
  );

  const changePasswordMutation = useMutation(
    (data: { email: string; password: string }) =>
      changePasswordWithoutLogin(data),
    {
      onSuccess: () => {},
    }
  );

  return {
    emailAuthCodeMutation,
    checkAuthCodeMutation,
    changePasswordMutation,
  };
};
