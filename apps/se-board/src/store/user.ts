import { getStoredRefreshToken } from "@/api/storage";

class User {
  private accessToken: string = "";

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(value: string) {
    this.accessToken = value;
  }
  hasAuth() {
    return getStoredRefreshToken() ? true : false;
  }
}

export const user = new User();
