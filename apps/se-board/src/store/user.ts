import { atom, useRecoilState } from "recoil";

export const roleNames = {
  ROLE_KUMOH: "금오인",
};

export const userState = atom<{
  nickname: string;
  email: string;
  roles: string[];
}>({
  key: "userState",
  default: {
    nickname: "",
    email: "",
    roles: [],
  },
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);

  return {
    userInfo: user,
    hasAuth: !!user.email,
  };
};
