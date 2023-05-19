declare module "@types" {
  interface SignupDTO {
    id: string;
    password: string;
    nickname: string;
    name: string;
  }

  interface OAuthSignupDTO {
    nickname: string;
    name: string;
    email: string;
    provider: string;
    subject: string;
    password: string;
  }

  interface checkAuthCodeDTO {
    email: string;
    authToken: string;
  }

  interface LoginDTO {
    username: string;
    password: string;
  }

  interface LoginFormFileds {
    id: string;
    password: string;
    maintainLogin: boolean;
  }

  interface FormLoginResponse {
    accessToken: string;
    refreshToken: string;
  }

  interface OAuthUserBasicInfoResponse {
    accessToken: string;
    email: string;
    name: string;
    nickname: string;
    provider: string;
    subject: string;
  }
}
