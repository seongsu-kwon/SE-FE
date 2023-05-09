import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkAuthCodeDTO,
  FormLoginResponse,
  LoginFormFileds,
  OAuthSignupDTO,
  SignupDTO,
} from "@types";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

import {
  checkAuthCode,
  checkDuplicatedNicname,
  convertLoginFormFiledsToLoginDTO,
  fetchOAUthUserBasicInfo,
  login,
  loginWithKakao,
  logout,
  oAuthSignup,
  reissueToken,
  requestEmailAuthCode,
  signup,
} from "@/api/auth";
import {
  getStoredRefreshToken,
  isMaintainLogin,
  removeBearerToken,
  setStoredRefreshToken,
} from "@/api/storage";
import { useNavigatePage } from "@/hooks";
import { user } from "@/store/user";

export const useRequestEmailAuthCode = () => {
  return useMutation((email: string) => requestEmailAuthCode(email));
};

export const useSignup = () => {
  const navigate = useNavigate();

  const emailAuthCodeMutation = useMutation((email: string) =>
    requestEmailAuthCode(email)
  );

  const checkAuthCodeMutation = useMutation((data: checkAuthCodeDTO) =>
    checkAuthCode(data)
  );

  const checkDuplicatedNicnameMutation = useMutation((nicname: string) =>
    checkDuplicatedNicname(nicname)
  );

  const signupMutation = useMutation((data: SignupDTO) => signup(data), {
    onSuccess: () => {
      navigate("/signup/complete");
    },
  });

  const oAuthSignupMutation = useMutation(
    (data: OAuthSignupDTO) => oAuthSignup(data),
    {
      onSuccess: () => {
        navigate("/signup/complete");
      },
    }
  );

  return {
    emailAuthCodeMutation,
    checkAuthCodeMutation,
    signupMutation,
    oAuthSignupMutation,
    checkDuplicatedNicnameMutation,
  };
};

export const useFetchOAuthUserBasicInfo = (id: string) => {
  return useQuery(["oauthasd"], () => fetchOAUthUserBasicInfo(id));
};

export const useLogin = (maintainLogin: boolean = false) => {
  const { goToMainPage } = useNavigatePage();
  return useMutation<
    AxiosResponse<FormLoginResponse>,
    { code: number; message: string },
    LoginFormFileds
  >((data: LoginFormFileds) => login(convertLoginFormFiledsToLoginDTO(data)), {
    onSuccess: (res) => {
      if (maintainLogin) {
        setStoredRefreshToken(res.data.refreshToken, true);
      } else {
        setStoredRefreshToken(res.data.refreshToken);
      }
      user.setAccessToken(removeBearerToken(res.data.accessToken));
      goToMainPage();
    },
  });
};

export const useKakaoLogin = async (id: string) => {
  const { goToMainPage } = useNavigatePage();
  return loginWithKakao(id).then((res) => {
    setStoredRefreshToken(res.data.refreshToken);
    user.setAccessToken(removeBearerToken(res.data.accessToken));
    goToMainPage();
  });
};

export const useLogout = () => {
  const { goToLoginPage } = useNavigatePage();
  return useQuery(["logout"], logout, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: (res) => {
      localStorage.removeItem("refresh_token");
      sessionStorage.removeItem("refresh_token");
      if (res.data.requiredRedirect) {
        window.location.href = res.data.url;
      }
      goToLoginPage();
    },
  });
};

export const useReissueToken = () => {
  return useMutation(() => reissueToken("Bearer " + getStoredRefreshToken()!), {
    onSuccess: (res) => {
      user.setAccessToken(removeBearerToken(res.data.accessToken));

      if (isMaintainLogin()) {
        setStoredRefreshToken(res.data.refreshToken, true);
      } else {
        setStoredRefreshToken(res.data.refreshToken);
      }
    },
    onError: () => {
      localStorage.removeItem("refresh_token");
      sessionStorage.removeItem("refresh_token");
    },
  });
};
