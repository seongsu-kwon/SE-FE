import { atom, useRecoilState } from "recoil";

export const roleNames = {
  ROLE_KUMOH: "금오인",
};

export const userState = atom<{
  nickname: string;
  userId: number;
  email: string;
  roles: string[];
}>({
  key: "userState",
  default: {
    nickname: "",
    email: "",
    userId: -1,
    roles: [],
  },
});

export const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);

  return {
    userInfo: user,
    hasAuth: user.userId !== -1,
  };
};
