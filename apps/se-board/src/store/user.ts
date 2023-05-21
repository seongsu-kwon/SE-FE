import { getStoredRefreshToken } from "@/api/storage";

class User {
  private accessToken: string = "";
  private nickname: string = "";
  private email: string = "";
  private roles: string[] = [];

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(value: string) {
    this.accessToken = value;
  }
  hasAuth() {
    return getStoredRefreshToken() ? true : false;
  }

  getNickname() {
    return this.nickname;
  }

  setNickname(value: string) {
    this.nickname = value;
  }

  getEmail() {
    return this.email;
  }

  setEmail(value: string) {
    this.email = value;
  }

  getRoles() {
    return this.roles;
  }

  setRoles(value: string[]) {
    this.roles = value;
  }
}

export const user = new User();
