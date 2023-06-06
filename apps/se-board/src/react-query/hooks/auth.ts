import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ChangePasswordRequestDTO,
  checkAuthCodeDTO,
  FormLoginResponse,
  LoginFormFileds,
  OAuthSignupDTO,
  SignupDTO,
} from "@types";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import {
  changePassword,
  checkAuthCode,
  checkDuplicatedNicname,
  checkKumohmailAuthCode,
  convertLoginFormFiledsToLoginDTO,
  fetchOAUthUserBasicInfo,
  login,
  loginWithKakao,
  logout,
  oAuthSignup,
  reissueToken,
  requestEmailAuthCode,
  requestKumohmailAuthCode,
  signup,
} from "@/api/auth";
import { fetchUserSimpleInfo } from "@/api/profile";
import {
  getStoredRefreshToken,
  isMaintainLogin,
  removeBearerToken,
  setStoredRefreshToken,
} from "@/api/storage";
import { useNavigatePage } from "@/hooks";
import { roleNames, user, userState } from "@/store/user";

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
  const setUserState = useSetRecoilState(userState);
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
      setUserState((prev) => ({
        ...prev,
        accessToken: removeBearerToken(res.data.accessToken),
      }));

      fetchUserSimpleInfo().then((res) => {
        const { nickname, email, roles } = res.data;
        user.setNickname(nickname);
        user.setEmail(email);
        user.setRoles(roles.map((v) => roleNames[v as keyof typeof roleNames]));
        setUserState((prev) => ({
          ...prev,
          nickname,
          email,
          roles: roles.map((v) => roleNames[v as keyof typeof roleNames]),
        }));
      });

      goToMainPage();
    },
  });
};

export const useKakaoLogin = async (id: string) => {
  const setUserState = useSetRecoilState(userState);

  const { goToMainPage } = useNavigatePage();
  return loginWithKakao(id).then((res) => {
    setStoredRefreshToken(res.data.refreshToken);
    user.setAccessToken(removeBearerToken(res.data.accessToken));

    fetchUserSimpleInfo().then((res) => {
      const { nickname, email, roles } = res.data;
      user.setNickname(nickname);
      user.setEmail(email);
      user.setRoles(roles);
      setUserState((prev) => ({
        ...prev,
        nickname,
        email,
        roles: roles.map((v) => roleNames[v as keyof typeof roleNames]),
      }));
    });

    goToMainPage();
  });
};

export const useLogout = () => {
  const { goToLoginPage } = useNavigatePage();
  const refreshToken = getStoredRefreshToken();
  return useMutation(["logout"], () => logout(refreshToken!), {
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
  const setUserState = useSetRecoilState(userState);

  return useMutation(() => reissueToken("Bearer " + getStoredRefreshToken()!), {
    onSuccess: (res) => {
      user.setAccessToken(removeBearerToken(res.data.accessToken));
      setUserState((prev) => ({ ...prev, accessToken: res.data.accessToken }));
      if (isMaintainLogin()) {
        setStoredRefreshToken(res.data.refreshToken, true);
      } else {
        setStoredRefreshToken(res.data.refreshToken);
      }

      fetchUserSimpleInfo().then((res) => {
        const { nickname, email, roles } = res.data;
        user.setNickname(nickname);
        user.setEmail(email);
        user.setRoles(roles);
        setUserState((prev) => ({
          ...prev,
          nickname,
          email,
          roles: roles.map((v) => roleNames[v as keyof typeof roleNames]),
        }));
      });
    },
    onError: () => {
      localStorage.removeItem("refresh_token");
      sessionStorage.removeItem("refresh_token");
    },
  });
};

export const useChangePassword = () => {
  return useMutation((data: ChangePasswordRequestDTO) => changePassword(data), {
    onSuccess: () => {},
    onError: () => {},
  });
};

export const useKumohCertification = () => {
  const emailAuthCodeMutation = useMutation((email: string) =>
    requestKumohmailAuthCode(email)
  );

  const checkAuthCodeMutation = useMutation(
    (data: checkAuthCodeDTO) => checkKumohmailAuthCode(data).then(),
    { onSuccess: () => {} }
  );

  return { emailAuthCodeMutation, checkAuthCodeMutation };
};
